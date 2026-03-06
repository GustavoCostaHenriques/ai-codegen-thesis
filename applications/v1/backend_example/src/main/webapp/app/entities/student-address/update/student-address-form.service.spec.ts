import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../student-address.test-samples';

import { StudentAddressFormService } from './student-address-form.service';

describe('StudentAddress Form Service', () => {
  let service: StudentAddressFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAddressFormService);
  });

  describe('Service methods', () => {
    describe('createStudentAddressFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStudentAddressFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            adressLine: expect.any(Object),
            postalCode: expect.any(Object),
            city: expect.any(Object),
            country: expect.any(Object),
          }),
        );
      });

      it('passing IStudentAddress should create a new form with FormGroup', () => {
        const formGroup = service.createStudentAddressFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            adressLine: expect.any(Object),
            postalCode: expect.any(Object),
            city: expect.any(Object),
            country: expect.any(Object),
          }),
        );
      });
    });

    describe('getStudentAddress', () => {
      it('should return NewStudentAddress for default StudentAddress initial value', () => {
        const formGroup = service.createStudentAddressFormGroup(sampleWithNewData);

        const studentAddress = service.getStudentAddress(formGroup) as any;

        expect(studentAddress).toMatchObject(sampleWithNewData);
      });

      it('should return NewStudentAddress for empty StudentAddress initial value', () => {
        const formGroup = service.createStudentAddressFormGroup();

        const studentAddress = service.getStudentAddress(formGroup) as any;

        expect(studentAddress).toMatchObject({});
      });

      it('should return IStudentAddress', () => {
        const formGroup = service.createStudentAddressFormGroup(sampleWithRequiredData);

        const studentAddress = service.getStudentAddress(formGroup) as any;

        expect(studentAddress).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStudentAddress should not enable id FormControl', () => {
        const formGroup = service.createStudentAddressFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStudentAddress should disable id FormControl', () => {
        const formGroup = service.createStudentAddressFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
