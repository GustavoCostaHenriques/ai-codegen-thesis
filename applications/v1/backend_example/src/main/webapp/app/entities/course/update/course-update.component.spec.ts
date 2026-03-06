import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { CourseService } from '../service/course.service';
import { ICourse } from '../course.model';
import { CourseFormService } from './course-form.service';

import { CourseUpdateComponent } from './course-update.component';

describe('Course Management Update Component', () => {
  let comp: CourseUpdateComponent;
  let fixture: ComponentFixture<CourseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let courseFormService: CourseFormService;
  let courseService: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CourseUpdateComponent],
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
      .overrideTemplate(CourseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CourseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    courseFormService = TestBed.inject(CourseFormService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const course: ICourse = { id: 3722 };

      activatedRoute.data = of({ course });
      comp.ngOnInit();

      expect(comp.course).toEqual(course);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourse>>();
      const course = { id: 2858 };
      jest.spyOn(courseFormService, 'getCourse').mockReturnValue(course);
      jest.spyOn(courseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ course });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: course }));
      saveSubject.complete();

      // THEN
      expect(courseFormService.getCourse).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(courseService.update).toHaveBeenCalledWith(expect.objectContaining(course));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourse>>();
      const course = { id: 2858 };
      jest.spyOn(courseFormService, 'getCourse').mockReturnValue({ id: null });
      jest.spyOn(courseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ course: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: course }));
      saveSubject.complete();

      // THEN
      expect(courseFormService.getCourse).toHaveBeenCalled();
      expect(courseService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourse>>();
      const course = { id: 2858 };
      jest.spyOn(courseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ course });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(courseService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
