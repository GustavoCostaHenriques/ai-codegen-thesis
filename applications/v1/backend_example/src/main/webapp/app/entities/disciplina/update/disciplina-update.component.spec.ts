import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { DisciplinaService } from '../service/disciplina.service';
import { IDisciplina } from '../disciplina.model';
import { DisciplinaFormService } from './disciplina-form.service';

import { DisciplinaUpdateComponent } from './disciplina-update.component';

describe('Disciplina Management Update Component', () => {
  let comp: DisciplinaUpdateComponent;
  let fixture: ComponentFixture<DisciplinaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let disciplinaFormService: DisciplinaFormService;
  let disciplinaService: DisciplinaService;
  let courseService: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DisciplinaUpdateComponent],
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
      .overrideTemplate(DisciplinaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DisciplinaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    disciplinaFormService = TestBed.inject(DisciplinaFormService);
    disciplinaService = TestBed.inject(DisciplinaService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Course query and add missing value', () => {
      const disciplina: IDisciplina = { id: 20769 };
      const course: ICourse = { id: 2858 };
      disciplina.course = course;

      const courseCollection: ICourse[] = [{ id: 2858 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ disciplina });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const disciplina: IDisciplina = { id: 20769 };
      const course: ICourse = { id: 2858 };
      disciplina.course = course;

      activatedRoute.data = of({ disciplina });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection).toContainEqual(course);
      expect(comp.disciplina).toEqual(disciplina);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDisciplina>>();
      const disciplina = { id: 26676 };
      jest.spyOn(disciplinaFormService, 'getDisciplina').mockReturnValue(disciplina);
      jest.spyOn(disciplinaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disciplina });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: disciplina }));
      saveSubject.complete();

      // THEN
      expect(disciplinaFormService.getDisciplina).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(disciplinaService.update).toHaveBeenCalledWith(expect.objectContaining(disciplina));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDisciplina>>();
      const disciplina = { id: 26676 };
      jest.spyOn(disciplinaFormService, 'getDisciplina').mockReturnValue({ id: null });
      jest.spyOn(disciplinaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disciplina: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: disciplina }));
      saveSubject.complete();

      // THEN
      expect(disciplinaFormService.getDisciplina).toHaveBeenCalled();
      expect(disciplinaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDisciplina>>();
      const disciplina = { id: 26676 };
      jest.spyOn(disciplinaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disciplina });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(disciplinaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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
