import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { IDisciplina } from '../disciplina.model';
import { DisciplinaService } from '../service/disciplina.service';
import { DisciplinaFormGroup, DisciplinaFormService } from './disciplina-form.service';

@Component({
  selector: 'jhi-disciplina-update',
  templateUrl: './disciplina-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DisciplinaUpdateComponent implements OnInit {
  isSaving = false;
  disciplina: IDisciplina | null = null;

  coursesSharedCollection: ICourse[] = [];

  protected disciplinaService = inject(DisciplinaService);
  protected disciplinaFormService = inject(DisciplinaFormService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DisciplinaFormGroup = this.disciplinaFormService.createDisciplinaFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disciplina }) => {
      this.disciplina = disciplina;
      if (disciplina) {
        this.updateForm(disciplina);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const disciplina = this.disciplinaFormService.getDisciplina(this.editForm);
    if (disciplina.id !== null) {
      this.subscribeToSaveResponse(this.disciplinaService.update(disciplina));
    } else {
      this.subscribeToSaveResponse(this.disciplinaService.create(disciplina));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisciplina>>): void {
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

  protected updateForm(disciplina: IDisciplina): void {
    this.disciplina = disciplina;
    this.disciplinaFormService.resetForm(this.editForm, disciplina);

    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      disciplina.course,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.disciplina?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));
  }
}
