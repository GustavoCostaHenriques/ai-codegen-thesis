import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../day-user.test-samples';

import { DayUserFormService } from './day-user-form.service';

describe('DayUser Form Service', () => {
  let service: DayUserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayUserFormService);
  });

  describe('Service methods', () => {
    describe('createDayUserFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDayUserFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            user: expect.any(Object),
            dayPlan: expect.any(Object),
          }),
        );
      });

      it('passing IDayUser should create a new form with FormGroup', () => {
        const formGroup = service.createDayUserFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            user: expect.any(Object),
            dayPlan: expect.any(Object),
          }),
        );
      });
    });

    describe('getDayUser', () => {
      it('should return NewDayUser for default DayUser initial value', () => {
        const formGroup = service.createDayUserFormGroup(sampleWithNewData);

        const dayUser = service.getDayUser(formGroup) as any;

        expect(dayUser).toMatchObject(sampleWithNewData);
      });

      it('should return NewDayUser for empty DayUser initial value', () => {
        const formGroup = service.createDayUserFormGroup();

        const dayUser = service.getDayUser(formGroup) as any;

        expect(dayUser).toMatchObject({});
      });

      it('should return IDayUser', () => {
        const formGroup = service.createDayUserFormGroup(sampleWithRequiredData);

        const dayUser = service.getDayUser(formGroup) as any;

        expect(dayUser).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDayUser should not enable id FormControl', () => {
        const formGroup = service.createDayUserFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDayUser should disable id FormControl', () => {
        const formGroup = service.createDayUserFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
