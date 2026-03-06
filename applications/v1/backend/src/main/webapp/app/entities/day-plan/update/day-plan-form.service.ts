import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDayPlan, NewDayPlan } from '../day-plan.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDayPlan for edit and NewDayPlanFormGroupInput for create.
 */
type DayPlanFormGroupInput = IDayPlan | PartialWithRequiredKeyOf<NewDayPlan>;

type DayPlanFormDefaults = Pick<NewDayPlan, 'id'>;

type DayPlanFormGroupContent = {
  id: FormControl<IDayPlan['id'] | NewDayPlan['id']>;
  date: FormControl<IDayPlan['date']>;
  week: FormControl<IDayPlan['week']>;
};

export type DayPlanFormGroup = FormGroup<DayPlanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DayPlanFormService {
  createDayPlanFormGroup(dayPlan: DayPlanFormGroupInput = { id: null }): DayPlanFormGroup {
    const dayPlanRawValue = {
      ...this.getFormDefaults(),
      ...dayPlan,
    };
    return new FormGroup<DayPlanFormGroupContent>({
      id: new FormControl(
        { value: dayPlanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      date: new FormControl(dayPlanRawValue.date, {
        validators: [Validators.required],
      }),
      week: new FormControl(dayPlanRawValue.week, {
        validators: [Validators.required],
      }),
    });
  }

  getDayPlan(form: DayPlanFormGroup): IDayPlan | NewDayPlan {
    return form.getRawValue() as IDayPlan | NewDayPlan;
  }

  resetForm(form: DayPlanFormGroup, dayPlan: DayPlanFormGroupInput): void {
    const dayPlanRawValue = { ...this.getFormDefaults(), ...dayPlan };
    form.reset(
      {
        ...dayPlanRawValue,
        id: { value: dayPlanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DayPlanFormDefaults {
    return {
      id: null,
    };
  }
}
