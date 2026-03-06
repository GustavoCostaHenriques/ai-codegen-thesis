import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDayUser } from 'app/entities/day-user/day-user.model';
import { DayUserService } from 'app/entities/day-user/service/day-user.service';
import { IProject } from 'app/entities/project/project.model';
import { ProjectService } from 'app/entities/project/service/project.service';
import { IDayUserProject } from '../day-user-project.model';
import { DayUserProjectService } from '../service/day-user-project.service';
import { DayUserProjectFormService } from './day-user-project-form.service';

import { DayUserProjectUpdateComponent } from './day-user-project-update.component';

describe('DayUserProject Management Update Component', () => {
  let comp: DayUserProjectUpdateComponent;
  let fixture: ComponentFixture<DayUserProjectUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dayUserProjectFormService: DayUserProjectFormService;
  let dayUserProjectService: DayUserProjectService;
  let dayUserService: DayUserService;
  let projectService: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DayUserProjectUpdateComponent],
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
      .overrideTemplate(DayUserProjectUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DayUserProjectUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dayUserProjectFormService = TestBed.inject(DayUserProjectFormService);
    dayUserProjectService = TestBed.inject(DayUserProjectService);
    dayUserService = TestBed.inject(DayUserService);
    projectService = TestBed.inject(ProjectService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call DayUser query and add missing value', () => {
      const dayUserProject: IDayUserProject = { id: 11491 };
      const dayUser: IDayUser = { id: 14946 };
      dayUserProject.dayUser = dayUser;

      const dayUserCollection: IDayUser[] = [{ id: 14946 }];
      jest.spyOn(dayUserService, 'query').mockReturnValue(of(new HttpResponse({ body: dayUserCollection })));
      const additionalDayUsers = [dayUser];
      const expectedCollection: IDayUser[] = [...additionalDayUsers, ...dayUserCollection];
      jest.spyOn(dayUserService, 'addDayUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dayUserProject });
      comp.ngOnInit();

      expect(dayUserService.query).toHaveBeenCalled();
      expect(dayUserService.addDayUserToCollectionIfMissing).toHaveBeenCalledWith(
        dayUserCollection,
        ...additionalDayUsers.map(expect.objectContaining),
      );
      expect(comp.dayUsersSharedCollection).toEqual(expectedCollection);
    });

    it('should call Project query and add missing value', () => {
      const dayUserProject: IDayUserProject = { id: 11491 };
      const project: IProject = { id: 10300 };
      dayUserProject.project = project;

      const projectCollection: IProject[] = [{ id: 10300 }];
      jest.spyOn(projectService, 'query').mockReturnValue(of(new HttpResponse({ body: projectCollection })));
      const additionalProjects = [project];
      const expectedCollection: IProject[] = [...additionalProjects, ...projectCollection];
      jest.spyOn(projectService, 'addProjectToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dayUserProject });
      comp.ngOnInit();

      expect(projectService.query).toHaveBeenCalled();
      expect(projectService.addProjectToCollectionIfMissing).toHaveBeenCalledWith(
        projectCollection,
        ...additionalProjects.map(expect.objectContaining),
      );
      expect(comp.projectsSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const dayUserProject: IDayUserProject = { id: 11491 };
      const dayUser: IDayUser = { id: 14946 };
      dayUserProject.dayUser = dayUser;
      const project: IProject = { id: 10300 };
      dayUserProject.project = project;

      activatedRoute.data = of({ dayUserProject });
      comp.ngOnInit();

      expect(comp.dayUsersSharedCollection).toContainEqual(dayUser);
      expect(comp.projectsSharedCollection).toContainEqual(project);
      expect(comp.dayUserProject).toEqual(dayUserProject);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDayUserProject>>();
      const dayUserProject = { id: 8065 };
      jest.spyOn(dayUserProjectFormService, 'getDayUserProject').mockReturnValue(dayUserProject);
      jest.spyOn(dayUserProjectService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dayUserProject });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dayUserProject }));
      saveSubject.complete();

      // THEN
      expect(dayUserProjectFormService.getDayUserProject).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dayUserProjectService.update).toHaveBeenCalledWith(expect.objectContaining(dayUserProject));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDayUserProject>>();
      const dayUserProject = { id: 8065 };
      jest.spyOn(dayUserProjectFormService, 'getDayUserProject').mockReturnValue({ id: null });
      jest.spyOn(dayUserProjectService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dayUserProject: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dayUserProject }));
      saveSubject.complete();

      // THEN
      expect(dayUserProjectFormService.getDayUserProject).toHaveBeenCalled();
      expect(dayUserProjectService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDayUserProject>>();
      const dayUserProject = { id: 8065 };
      jest.spyOn(dayUserProjectService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dayUserProject });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dayUserProjectService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDayUser', () => {
      it('should forward to dayUserService', () => {
        const entity = { id: 14946 };
        const entity2 = { id: 24491 };
        jest.spyOn(dayUserService, 'compareDayUser');
        comp.compareDayUser(entity, entity2);
        expect(dayUserService.compareDayUser).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProject', () => {
      it('should forward to projectService', () => {
        const entity = { id: 10300 };
        const entity2 = { id: 3319 };
        jest.spyOn(projectService, 'compareProject');
        comp.compareProject(entity, entity2);
        expect(projectService.compareProject).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
