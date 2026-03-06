import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IStudentAddress } from 'app/entities/student-address/student-address.model';
import { StudentAddressService } from 'app/entities/student-address/service/student-address.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { IStudent } from '../student.model';
import { StudentService } from '../service/student.service';
import { StudentFormService } from './student-form.service';

import { StudentUpdateComponent } from './student-update.component';

describe('Student Management Update Component', () => {
  let comp: StudentUpdateComponent;
  let fixture: ComponentFixture<StudentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let studentFormService: StudentFormService;
  let studentService: StudentService;
  let studentAddressService: StudentAddressService;
  let courseService: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(StudentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StudentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    studentFormService = TestBed.inject(StudentFormService);
    studentService = TestBed.inject(StudentService);
    studentAddressService = TestBed.inject(StudentAddressService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call studentAddress query and add missing value', () => {
      const student: IStudent = { id: 22718 };
      const studentAddress: IStudentAddress = { id: 10602 };
      student.studentAddress = studentAddress;

      const studentAddressCollection: IStudentAddress[] = [{ id: 10602 }];
      jest.spyOn(studentAddressService, 'query').mockReturnValue(of(new HttpResponse({ body: studentAddressCollection })));
      const expectedCollection: IStudentAddress[] = [studentAddress, ...studentAddressCollection];
      jest.spyOn(studentAddressService, 'addStudentAddressToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ student });
      comp.ngOnInit();

      expect(studentAddressService.query).toHaveBeenCalled();
      expect(studentAddressService.addStudentAddressToCollectionIfMissing).toHaveBeenCalledWith(studentAddressCollection, studentAddress);
      expect(comp.studentAddressesCollection).toEqual(expectedCollection);
    });

    it('should call Course query and add missing value', () => {
      const student: IStudent = { id: 22718 };
      const course: ICourse = { id: 2858 };
      student.course = course;

      const courseCollection: ICourse[] = [{ id: 2858 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ student });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const student: IStudent = { id: 22718 };
      const studentAddress: IStudentAddress = { id: 10602 };
      student.studentAddress = studentAddress;
      const course: ICourse = { id: 2858 };
      student.course = course;

      activatedRoute.data = of({ student });
      comp.ngOnInit();

      expect(comp.studentAddressesCollection).toContainEqual(studentAddress);
      expect(comp.coursesSharedCollection).toContainEqual(course);
      expect(comp.student).toEqual(student);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudent>>();
      const student = { id: 9978 };
      jest.spyOn(studentFormService, 'getStudent').mockReturnValue(student);
      jest.spyOn(studentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ student });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: student }));
      saveSubject.complete();

      // THEN
      expect(studentFormService.getStudent).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(studentService.update).toHaveBeenCalledWith(expect.objectContaining(student));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudent>>();
      const student = { id: 9978 };
      jest.spyOn(studentFormService, 'getStudent').mockReturnValue({ id: null });
      jest.spyOn(studentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ student: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: student }));
      saveSubject.complete();

      // THEN
      expect(studentFormService.getStudent).toHaveBeenCalled();
      expect(studentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudent>>();
      const student = { id: 9978 };
      jest.spyOn(studentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ student });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(studentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareStudentAddress', () => {
      it('should forward to studentAddressService', () => {
        const entity = { id: 10602 };
        const entity2 = { id: 19366 };
        jest.spyOn(studentAddressService, 'compareStudentAddress');
        comp.compareStudentAddress(entity, entity2);
        expect(studentAddressService.compareStudentAddress).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCourse', () => {
      it('should forward to courseService', () => {
        const entity = { id: 2858 };
        const entity2 = { id: 3722 };
        jest.spyOn(courseService, 'compareCourse');
        comp.compareCourse(entity, entity2);
        expect(courseService.compareCourse).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
