import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDayUserProject } from 'app/entities/day-user-project/day-user-project.model';
import { DayUserProjectService } from 'app/entities/day-user-project/service/day-user-project.service';
import { TaskService } from '../service/task.service';
import { ITask } from '../task.model';
import { TaskFormService } from './task-form.service';

import { TaskUpdateComponent } from './task-update.component';

describe('Task Management Update Component', () => {
  let comp: TaskUpdateComponent;
  let fixture: ComponentFixture<TaskUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taskFormService: TaskFormService;
  let taskService: TaskService;
  let dayUserProjectService: DayUserProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskUpdateComponent],
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
      .overrideTemplate(TaskUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaskUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taskFormService = TestBed.inject(TaskFormService);
    taskService = TestBed.inject(TaskService);
    dayUserProjectService = TestBed.inject(DayUserProjectService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call DayUserProject query and add missing value', () => {
      const task: ITask = { id: 22244 };
      const dayUserProject: IDayUserProject = { id: 8065 };
      task.dayUserProject = dayUserProject;

      const dayUserProjectCollection: IDayUserProject[] = [{ id: 8065 }];
      jest.spyOn(dayUserProjectService, 'query').mockReturnValue(of(new HttpResponse({ body: dayUserProjectCollection })));
      const additionalDayUserProjects = [dayUserProject];
      const expectedCollection: IDayUserProject[] = [...additionalDayUserProjects, ...dayUserProjectCollection];
      jest.spyOn(dayUserProjectService, 'addDayUserProjectToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ task });
      comp.ngOnInit();

      expect(dayUserProjectService.query).toHaveBeenCalled();
      expect(dayUserProjectService.addDayUserProjectToCollectionIfMissing).toHaveBeenCalledWith(
        dayUserProjectCollection,
        ...additionalDayUserProjects.map(expect.objectContaining),
      );
      expect(comp.dayUserProjectsSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const task: ITask = { id: 22244 };
      const dayUserProject: IDayUserProject = { id: 8065 };
      task.dayUserProject = dayUserProject;

      activatedRoute.data = of({ task });
      comp.ngOnInit();

      expect(comp.dayUserProjectsSharedCollection).toContainEqual(dayUserProject);
      expect(comp.task).toEqual(task);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask>>();
      const task = { id: 25192 };
      jest.spyOn(taskFormService, 'getTask').mockReturnValue(task);
      jest.spyOn(taskService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task }));
      saveSubject.complete();

      // THEN
      expect(taskFormService.getTask).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taskService.update).toHaveBeenCalledWith(expect.objectContaining(task));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask>>();
      const task = { id: 25192 };
      jest.spyOn(taskFormService, 'getTask').mockReturnValue({ id: null });
      jest.spyOn(taskService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task }));
      saveSubject.complete();

      // THEN
      expect(taskFormService.getTask).toHaveBeenCalled();
      expect(taskService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask>>();
      const task = { id: 25192 };
      jest.spyOn(taskService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taskService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDayUserProject', () => {
      it('should forward to dayUserProjectService', () => {
        const entity = { id: 8065 };
        const entity2 = { id: 11491 };
        jest.spyOn(dayUserProjectService, 'compareDayUserProject');
        comp.compareDayUserProject(entity, entity2);
        expect(dayUserProjectService.compareDayUserProject).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
