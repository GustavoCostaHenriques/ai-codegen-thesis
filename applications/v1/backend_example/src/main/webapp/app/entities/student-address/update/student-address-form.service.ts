import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IStudentAddress, NewStudentAddress } from '../student-address.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStudentAddress for edit and NewStudentAddressFormGroupInput for create.
 */
type StudentAddressFormGroupInput = IStudentAddress | PartialWithRequiredKeyOf<NewStudentAddress>;

type StudentAddressFormDefaults = Pick<NewStudentAddress, 'id'>;

type StudentAddressFormGroupContent = {
  id: FormControl<IStudentAddress['id'] | NewStudentAddress['id']>;
  adressLine: FormControl<IStudentAddress['adressLine']>;
  postalCode: FormControl<IStudentAddress['postalCode']>;
  city: FormControl<IStudentAddress['city']>;
  country: FormControl<IStudentAddress['country']>;
};

export type StudentAddressFormGroup = FormGroup<StudentAddressFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StudentAddressFormService {
  createStudentAddressFormGroup(studentAddress: StudentAddressFormGroupInput = { id: null }): StudentAddressFormGroup {
    const studentAddressRawValue = {
      ...this.getFormDefaults(),
      ...studentAddress,
    };
    return new FormGroup<StudentAddressFormGroupContent>({
      id: new FormControl(
        { value: studentAddressRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      adressLine: new FormControl(studentAddressRawValue.adressLine),
      postalCode: new FormControl(studentAddressRawValue.postalCode),
      city: new FormControl(studentAddressRawValue.city),
      country: new FormControl(studentAddressRawValue.country),
    });
  }

  getStudentAddress(form: StudentAddressFormGroup): IStudentAddress | NewStudentAddress {
    return form.getRawValue() as IStudentAddress | NewStudentAddress;
  }

  resetForm(form: StudentAddressFormGroup, studentAddress: StudentAddressFormGroupInput): void {
    const studentAddressRawValue = { ...this.getFormDefaults(), ...studentAddress };
    form.reset(
      {
        ...studentAddressRawValue,
        id: { value: studentAddressRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): StudentAddressFormDefaults {
    return {
      id: null,
    };
  }
}
