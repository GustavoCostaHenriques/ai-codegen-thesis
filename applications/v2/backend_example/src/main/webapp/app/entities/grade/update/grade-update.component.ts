import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { IDisciplina } from 'app/entities/disciplina/disciplina.model';
import { DisciplinaService } from 'app/entities/disciplina/service/disciplina.service';
import { GradeService } from '../service/grade.service';
import { IGrade } from '../grade.model';
import { GradeFormGroup, GradeFormService } from './grade-form.service';

@Component({
  selector: 'jhi-grade-update',
  templateUrl: './grade-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class GradeUpdateComponent implements OnInit {
  isSaving = false;
  grade: IGrade | null = null;

  studentsSharedCollection: IStudent[] = [];
  disciplinasSharedCollection: IDisciplina[] = [];

  protected gradeService = inject(GradeService);
  protected gradeFormService = inject(GradeFormService);
  protected studentService = inject(StudentService);
  protected disciplinaService = inject(DisciplinaService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: GradeFormGroup = this.gradeFormService.createGradeFormGroup();

  compareStudent = (o1: IStudent | null, o2: IStudent | null): boolean => this.studentService.compareStudent(o1, o2);

  compareDisciplina = (o1: IDisciplina | null, o2: IDisciplina | null): boolean => this.disciplinaService.compareDisciplina(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grade }) => {
      this.grade = grade;
      if (grade) {
        this.updateForm(grade);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grade = this.gradeFormService.getGrade(this.editForm);
    if (grade.id !== null) {
      this.subscribeToSaveResponse(this.gradeService.update(grade));
    } else {
      this.subscribeToSaveResponse(this.gradeService.create(grade));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrade>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(grade: IGrade): void {
    this.grade = grade;
    this.gradeFormService.resetForm(this.editForm, grade);

    this.studentsSharedCollection = this.studentService.addStudentToCollectionIfMissing<IStudent>(
      this.studentsSharedCollection,
      grade.student,
    );
    this.disciplinasSharedCollection = this.disciplinaService.addDisciplinaToCollectionIfMissing<IDisciplina>(
      this.disciplinasSharedCollection,
      grade.disciplina,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.studentService
      .query()
      .pipe(map((res: HttpResponse<IStudent[]>) => res.body ?? []))
      .pipe(map((students: IStudent[]) => this.studentService.addStudentToCollectionIfMissing<IStudent>(students, this.grade?.student)))
      .subscribe((students: IStudent[]) => (this.studentsSharedCollection = students));

    this.disciplinaService
      .query()
      .pipe(map((res: HttpResponse<IDisciplina[]>) => res.body ?? []))
      .pipe(
        map((disciplinas: IDisciplina[]) =>
          this.disciplinaService.addDisciplinaToCollectionIfMissing<IDisciplina>(disciplinas, this.grade?.disciplina),
        ),
      )
      .subscribe((disciplinas: IDisciplina[]) => (this.disciplinasSharedCollection = disciplinas));
  }
}
