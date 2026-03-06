import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IStudentAddress } from 'app/entities/student-address/student-address.model';
import { StudentAddressService } from 'app/entities/student-address/service/student-address.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { GenreEnum } from 'app/entities/enumerations/genre-enum.model';
import { StudentService } from '../service/student.service';
import { IStudent } from '../student.model';
import { StudentFormGroup, StudentFormService } from './student-form.service';

@Component({
  selector: 'jhi-student-update',
  templateUrl: './student-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class StudentUpdateComponent implements OnInit {
  isSaving = false;
  student: IStudent | null = null;
  genreEnumValues = Object.keys(GenreEnum);

  studentAddressesCollection: IStudentAddress[] = [];
  coursesSharedCollection: ICourse[] = [];

  protected studentService = inject(StudentService);
  protected studentFormService = inject(StudentFormService);
  protected studentAddressService = inject(StudentAddressService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: StudentFormGroup = this.studentFormService.createStudentFormGroup();

  compareStudentAddress = (o1: IStudentAddress | null, o2: IStudentAddress | null): boolean =>
    this.studentAddressService.compareStudentAddress(o1, o2);

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ student }) => {
      this.student = student;
      if (student) {
        this.updateForm(student);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const student = this.studentFormService.getStudent(this.editForm);
    if (student.id !== null) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>): void {
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

  protected updateForm(student: IStudent): void {
    this.student = student;
    this.studentFormService.resetForm(this.editForm, student);

    this.studentAddressesCollection = this.studentAddressService.addStudentAddressToCollectionIfMissing<IStudentAddress>(
      this.studentAddressesCollection,
      student.studentAddress,
    );
    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(this.coursesSharedCollection, student.course);
  }

  protected loadRelationshipsOptions(): void {
    this.studentAddressService
      .query({ 'studentId.specified': 'false' })
      .pipe(map((res: HttpResponse<IStudentAddress[]>) => res.body ?? []))
      .pipe(
        map((studentAddresses: IStudentAddress[]) =>
          this.studentAddressService.addStudentAddressToCollectionIfMissing<IStudentAddress>(
            studentAddresses,
            this.student?.studentAddress,
          ),
        ),
      )
      .subscribe((studentAddresses: IStudentAddress[]) => (this.studentAddressesCollection = studentAddresses));

    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.student?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));
  }
}
