import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDayUser, NewDayUser } from '../day-user.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDayUser for edit and NewDayUserFormGroupInput for create.
 */
type DayUserFormGroupInput = IDayUser | PartialWithRequiredKeyOf<NewDayUser>;

type DayUserFormDefaults = Pick<NewDayUser, 'id'>;

type DayUserFormGroupContent = {
  id: FormControl<IDayUser['id'] | NewDayUser['id']>;
  user: FormControl<IDayUser['user']>;
  dayPlan: FormControl<IDayUser['dayPlan']>;
};

export type DayUserFormGroup = FormGroup<DayUserFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DayUserFormService {
  createDayUserFormGroup(dayUser: DayUserFormGroupInput = { id: null }): DayUserFormGroup {
    const dayUserRawValue = {
      ...this.getFormDefaults(),
      ...dayUser,
    };
    return new FormGroup<DayUserFormGroupContent>({
      id: new FormControl(
        { value: dayUserRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      user: new FormControl(dayUserRawValue.user, {
        validators: [Validators.required],
      }),
      dayPlan: new FormControl(dayUserRawValue.dayPlan, {
        validators: [Validators.required],
      }),
    });
  }

  getDayUser(form: DayUserFormGroup): IDayUser | NewDayUser {
    return form.getRawValue() as IDayUser | NewDayUser;
  }

  resetForm(form: DayUserFormGroup, dayUser: DayUserFormGroupInput): void {
    const dayUserRawValue = { ...this.getFormDefaults(), ...dayUser };
    form.reset(
      {
        ...dayUserRawValue,
        id: { value: dayUserRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DayUserFormDefaults {
    return {
      id: null,
    };
  }
}
