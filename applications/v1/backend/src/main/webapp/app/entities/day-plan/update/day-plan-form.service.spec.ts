import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../day-plan.test-samples';

import { DayPlanFormService } from './day-plan-form.service';

describe('DayPlan Form Service', () => {
  let service: DayPlanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayPlanFormService);
  });

  describe('Service methods', () => {
    describe('createDayPlanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDayPlanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            date: expect.any(Object),
            week: expect.any(Object),
          }),
        );
      });

      it('passing IDayPlan should create a new form with FormGroup', () => {
        const formGroup = service.createDayPlanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            date: expect.any(Object),
            week: expect.any(Object),
          }),
        );
      });
    });

    describe('getDayPlan', () => {
      it('should return NewDayPlan for default DayPlan initial value', () => {
        const formGroup = service.createDayPlanFormGroup(sampleWithNewData);

        const dayPlan = service.getDayPlan(formGroup) as any;

        expect(dayPlan).toMatchObject(sampleWithNewData);
      });

      it('should return NewDayPlan for empty DayPlan initial value', () => {
        const formGroup = service.createDayPlanFormGroup();

        const dayPlan = service.getDayPlan(formGroup) as any;

        expect(dayPlan).toMatchObject({});
      });

      it('should return IDayPlan', () => {
        const formGroup = service.createDayPlanFormGroup(sampleWithRequiredData);

        const dayPlan = service.getDayPlan(formGroup) as any;

        expect(dayPlan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDayPlan should not enable id FormControl', () => {
        const formGroup = service.createDayPlanFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDayPlan should disable id FormControl', () => {
        const formGroup = service.createDayPlanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
