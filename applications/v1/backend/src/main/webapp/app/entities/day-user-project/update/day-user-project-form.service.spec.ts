import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../day-user-project.test-samples';

import { DayUserProjectFormService } from './day-user-project-form.service';

describe('DayUserProject Form Service', () => {
  let service: DayUserProjectFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayUserProjectFormService);
  });

  describe('Service methods', () => {
    describe('createDayUserProjectFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDayUserProjectFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dayUser: expect.any(Object),
            project: expect.any(Object),
          }),
        );
      });

      it('passing IDayUserProject should create a new form with FormGroup', () => {
        const formGroup = service.createDayUserProjectFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dayUser: expect.any(Object),
            project: expect.any(Object),
          }),
        );
      });
    });

    describe('getDayUserProject', () => {
      it('should return NewDayUserProject for default DayUserProject initial value', () => {
        const formGroup = service.createDayUserProjectFormGroup(sampleWithNewData);

        const dayUserProject = service.getDayUserProject(formGroup) as any;

        expect(dayUserProject).toMatchObject(sampleWithNewData);
      });

      it('should return NewDayUserProject for empty DayUserProject initial value', () => {
        const formGroup = service.createDayUserProjectFormGroup();

        const dayUserProject = service.getDayUserProject(formGroup) as any;

        expect(dayUserProject).toMatchObject({});
      });

      it('should return IDayUserProject', () => {
        const formGroup = service.createDayUserProjectFormGroup(sampleWithRequiredData);

        const dayUserProject = service.getDayUserProject(formGroup) as any;

        expect(dayUserProject).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDayUserProject should not enable id FormControl', () => {
        const formGroup = service.createDayUserProjectFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDayUserProject should disable id FormControl', () => {
        const formGroup = service.createDayUserProjectFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
