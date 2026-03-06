import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IWeek } from 'app/entities/week/week.model';
import { WeekService } from 'app/entities/week/service/week.service';
import { DayPlanService } from '../service/day-plan.service';
import { IDayPlan } from '../day-plan.model';
import { DayPlanFormService } from './day-plan-form.service';

import { DayPlanUpdateComponent } from './day-plan-update.component';

describe('DayPlan Management Update Component', () => {
  let comp: DayPlanUpdateComponent;
  let fixture: ComponentFixture<DayPlanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dayPlanFormService: DayPlanFormService;
  let dayPlanService: DayPlanService;
  let weekService: WeekService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DayPlanUpdateComponent],
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
      .overrideTemplate(DayPlanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DayPlanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dayPlanFormService = TestBed.inject(DayPlanFormService);
    dayPlanService = TestBed.inject(DayPlanService);
    weekService = TestBed.inject(WeekService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Week query and add missing value', () => {
      const dayPlan: IDayPlan = { id: 14911 };
      const week: IWeek = { id: 17262 };
      dayPlan.week = week;

      const weekCollection: IWeek[] = [{ id: 17262 }];
      jest.spyOn(weekService, 'query').mockReturnValue(of(new HttpResponse({ body: weekCollection })));
      const additionalWeeks = [week];
      const expectedCollection: IWeek[] = [...additionalWeeks, ...weekCollection];
      jest.spyOn(weekService, 'addWeekToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dayPlan });
      comp.ngOnInit();

      expect(weekService.query).toHaveBeenCalled();
      expect(weekService.addWeekToCollectionIfMissing).toHaveBeenCalledWith(
        weekCollection,
        ...additionalWeeks.map(expect.objectContaining),
      );
      expect(comp.weeksSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const dayPlan: IDayPlan = { id: 14911 };
      const week: IWeek = { id: 17262 };
      dayPlan.week = week;

      activatedRoute.data = of({ dayPlan });
      comp.ngOnInit();

      expect(comp.weeksSharedCollection).toContainEqual(week);
      expect(comp.dayPlan).toEqual(dayPlan);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDayPlan>>();
      const dayPlan = { id: 25287 };
      jest.spyOn(dayPlanFormService, 'getDayPlan').mockReturnValue(dayPlan);
      jest.spyOn(dayPlanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dayPlan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dayPlan }));
      saveSubject.complete();

      // THEN
      expect(dayPlanFormService.getDayPlan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dayPlanService.update).toHaveBeenCalledWith(expect.objectContaining(dayPlan));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDayPlan>>();
      const dayPlan = { id: 25287 };
      jest.spyOn(dayPlanFormService, 'getDayPlan').mockReturnValue({ id: null });
      jest.spyOn(dayPlanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dayPlan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dayPlan }));
      saveSubject.complete();

      // THEN
      expect(dayPlanFormService.getDayPlan).toHaveBeenCalled();
      expect(dayPlanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDayPlan>>();
      const dayPlan = { id: 25287 };
      jest.spyOn(dayPlanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dayPlan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dayPlanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareWeek', () => {
      it('should forward to weekService', () => {
        const entity = { id: 17262 };
        const entity2 = { id: 3727 };
        jest.spyOn(weekService, 'compareWeek');
        comp.compareWeek(entity, entity2);
        expect(weekService.compareWeek).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
