import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { IDisciplina } from 'app/entities/disciplina/disciplina.model';
import { DisciplinaService } from 'app/entities/disciplina/service/disciplina.service';
import { IGrade } from '../grade.model';
import { GradeService } from '../service/grade.service';
import { GradeFormService } from './grade-form.service';

import { GradeUpdateComponent } from './grade-update.component';

describe('Grade Management Update Component', () => {
  let comp: GradeUpdateComponent;
  let fixture: ComponentFixture<GradeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let gradeFormService: GradeFormService;
  let gradeService: GradeService;
  let studentService: StudentService;
  let disciplinaService: DisciplinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GradeUpdateComponent],
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
      .overrideTemplate(GradeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GradeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    gradeFormService = TestBed.inject(GradeFormService);
    gradeService = TestBed.inject(GradeService);
    studentService = TestBed.inject(StudentService);
    disciplinaService = TestBed.inject(DisciplinaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Student query and add missing value', () => {
      const grade: IGrade = { id: 31248 };
      const student: IStudent = { id: 9978 };
      grade.student = student;

      const studentCollection: IStudent[] = [{ id: 9978 }];
      jest.spyOn(studentService, 'query').mockReturnValue(of(new HttpResponse({ body: studentCollection })));
      const additionalStudents = [student];
      const expectedCollection: IStudent[] = [...additionalStudents, ...studentCollection];
      jest.spyOn(studentService, 'addStudentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      expect(studentService.query).toHaveBeenCalled();
      expect(studentService.addStudentToCollectionIfMissing).toHaveBeenCalledWith(
        studentCollection,
        ...additionalStudents.map(expect.objectContaining),
      );
      expect(comp.studentsSharedCollection).toEqual(expectedCollection);
    });

    it('should call Disciplina query and add missing value', () => {
      const grade: IGrade = { id: 31248 };
      const disciplina: IDisciplina = { id: 26676 };
      grade.disciplina = disciplina;

      const disciplinaCollection: IDisciplina[] = [{ id: 26676 }];
      jest.spyOn(disciplinaService, 'query').mockReturnValue(of(new HttpResponse({ body: disciplinaCollection })));
      const additionalDisciplinas = [disciplina];
      const expectedCollection: IDisciplina[] = [...additionalDisciplinas, ...disciplinaCollection];
      jest.spyOn(disciplinaService, 'addDisciplinaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      expect(disciplinaService.query).toHaveBeenCalled();
      expect(disciplinaService.addDisciplinaToCollectionIfMissing).toHaveBeenCalledWith(
        disciplinaCollection,
        ...additionalDisciplinas.map(expect.objectContaining),
      );
      expect(comp.disciplinasSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const grade: IGrade = { id: 31248 };
      const student: IStudent = { id: 9978 };
      grade.student = student;
      const disciplina: IDisciplina = { id: 26676 };
      grade.disciplina = disciplina;

      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      expect(comp.studentsSharedCollection).toContainEqual(student);
      expect(comp.disciplinasSharedCollection).toContainEqual(disciplina);
      expect(comp.grade).toEqual(grade);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrade>>();
      const grade = { id: 31493 };
      jest.spyOn(gradeFormService, 'getGrade').mockReturnValue(grade);
      jest.spyOn(gradeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grade }));
      saveSubject.complete();

      // THEN
      expect(gradeFormService.getGrade).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(gradeService.update).toHaveBeenCalledWith(expect.objectContaining(grade));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrade>>();
      const grade = { id: 31493 };
      jest.spyOn(gradeFormService, 'getGrade').mockReturnValue({ id: null });
      jest.spyOn(gradeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grade: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grade }));
      saveSubject.complete();

      // THEN
      expect(gradeFormService.getGrade).toHaveBeenCalled();
      expect(gradeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrade>>();
      const grade = { id: 31493 };
      jest.spyOn(gradeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(gradeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareStudent', () => {
      it('should forward to studentService', () => {
        const entity = { id: 9978 };
        const entity2 = { id: 22718 };
        jest.spyOn(studentService, 'compareStudent');
        comp.compareStudent(entity, entity2);
        expect(studentService.compareStudent).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDisciplina', () => {
      it('should forward to disciplinaService', () => {
        const entity = { id: 26676 };
        const entity2 = { id: 20769 };
        jest.spyOn(disciplinaService, 'compareDisciplina');
        comp.compareDisciplina(entity, entity2);
        expect(disciplinaService.compareDisciplina).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
