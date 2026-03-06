import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IAppUser } from 'app/entities/app-user/app-user.model';
import { AppUserService } from 'app/entities/app-user/service/app-user.service';
import { IDayPlan } from 'app/entities/day-plan/day-plan.model';
import { DayPlanService } from 'app/entities/day-plan/service/day-plan.service';
import { IDayUser } from '../day-user.model';
import { DayUserService } from '../service/day-user.service';
import { DayUserFormService } from './day-user-form.service';

import { DayUserUpdateComponent } from './day-user-update.component';

describe('DayUser Management Update Component', () => {
  let comp: DayUserUpdateComponent;
  let fixture: ComponentFixture<DayUserUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dayUserFormService: DayUserFormService;
  let dayUserService: DayUserService;
  let appUserService: AppUserService;
  let dayPlanService: DayPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DayUserUpdateComponent],
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
      .overrideTemplate(DayUserUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DayUserUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dayUserFormService = TestBed.inject(DayUserFormService);
    dayUserService = TestBed.inject(DayUserService);
    appUserService = TestBed.inject(AppUserService);
    dayPlanService = TestBed.inject(DayPlanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call AppUser query and add missing value', () => {
      const dayUser: IDayUser = { id: 24491 };
      const user: IAppUser = { id: 14418 };
      dayUser.user = user;

      const appUserCollection: IAppUser[] = [{ id: 14418 }];
      jest.spyOn(appUserService, 'query').mockReturnValue(of(new HttpResponse({ body: appUserCollection })));
      const additionalAppUsers = [user];
      const expectedCollection: IAppUser[] = [...additionalAppUsers, ...appUserCollection];
      jest.spyOn(appUserService, 'addAppUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dayUser });
      comp.ngOnInit();

      expect(appUserService.query).toHaveBeenCalled();
      expect(appUserService.addAppUserToCollectionIfMissing).toHaveBeenCalledWith(
        appUserCollection,
        ...additionalAppUsers.map(expect.objectContaining),
      );
      expect(comp.appUsersSharedCollection).toEqual(expectedCollection);
    });

    it('should call DayPlan query and add missing value', () => {
      const dayUser: IDayUser = { id: 24491 };
      const dayPlan: IDayPlan = { id: 25287 };
      dayUser.dayPlan = dayPlan;

      const dayPlanCollection: IDayPlan[] = [{ id: 25287 }];
      jest.spyOn(dayPlanService, 'query').mockReturnValue(of(new HttpResponse({ body: dayPlanCollection })));
      const additionalDayPlans = [dayPlan];
      const expectedCollection: IDayPlan[] = [...additionalDayPlans, ...dayPlanCollection];
      jest.spyOn(dayPlanService, 'addDayPlanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dayUser });
      comp.ngOnInit();

      expect(dayPlanService.query).toHaveBeenCalled();
      expect(dayPlanService.addDayPlanToCollectionIfMissing).toHaveBeenCalledWith(
        dayPlanCollection,
        ...additionalDayPlans.map(expect.objectContaining),
      );
      expect(comp.dayPlansSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const dayUser: IDayUser = { id: 24491 };
      const user: IAppUser = { id: 14418 };
      dayUser.user = user;
      const dayPlan: IDayPlan = { id: 25287 };
      dayUser.dayPlan = dayPlan;

      activatedRoute.data = of({ dayUser });
      comp.ngOnInit();

      expect(comp.appUsersSharedCollection).toContainEqual(user);
      expect(comp.dayPlansSharedCollection).toContainEqual(dayPlan);
      expect(comp.dayUser).toEqual(dayUser);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDayUser>>();
      const dayUser = { id: 14946 };
      jest.spyOn(dayUserFormService, 'getDayUser').mockReturnValue(dayUser);
      jest.spyOn(dayUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dayUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dayUser }));
      saveSubject.complete();

      // THEN
      expect(dayUserFormService.getDayUser).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dayUserService.update).toHaveBeenCalledWith(expect.objectContaining(dayUser));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDayUser>>();
      const dayUser = { id: 14946 };
      jest.spyOn(dayUserFormService, 'getDayUser').mockReturnValue({ id: null });
      jest.spyOn(dayUserService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dayUser: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dayUser }));
      saveSubject.complete();

      // THEN
      expect(dayUserFormService.getDayUser).toHaveBeenCalled();
      expect(dayUserService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDayUser>>();
      const dayUser = { id: 14946 };
      jest.spyOn(dayUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dayUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dayUserService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAppUser', () => {
      it('should forward to appUserService', () => {
        const entity = { id: 14418 };
        const entity2 = { id: 16679 };
        jest.spyOn(appUserService, 'compareAppUser');
        comp.compareAppUser(entity, entity2);
        expect(appUserService.compareAppUser).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDayPlan', () => {
      it('should forward to dayPlanService', () => {
        const entity = { id: 25287 };
        const entity2 = { id: 14911 };
        jest.spyOn(dayPlanService, 'compareDayPlan');
        comp.compareDayPlan(entity, entity2);
        expect(dayPlanService.compareDayPlan).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
