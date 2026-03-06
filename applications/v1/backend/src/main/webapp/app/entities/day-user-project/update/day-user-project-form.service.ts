import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDayUserProject, NewDayUserProject } from '../day-user-project.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDayUserProject for edit and NewDayUserProjectFormGroupInput for create.
 */
type DayUserProjectFormGroupInput = IDayUserProject | PartialWithRequiredKeyOf<NewDayUserProject>;

type DayUserProjectFormDefaults = Pick<NewDayUserProject, 'id'>;

type DayUserProjectFormGroupContent = {
  id: FormControl<IDayUserProject['id'] | NewDayUserProject['id']>;
  dayUser: FormControl<IDayUserProject['dayUser']>;
  project: FormControl<IDayUserProject['project']>;
};

export type DayUserProjectFormGroup = FormGroup<DayUserProjectFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DayUserProjectFormService {
  createDayUserProjectFormGroup(dayUserProject: DayUserProjectFormGroupInput = { id: null }): DayUserProjectFormGroup {
    const dayUserProjectRawValue = {
      ...this.getFormDefaults(),
      ...dayUserProject,
    };
    return new FormGroup<DayUserProjectFormGroupContent>({
      id: new FormControl(
        { value: dayUserProjectRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dayUser: new FormControl(dayUserProjectRawValue.dayUser, {
        validators: [Validators.required],
      }),
      project: new FormControl(dayUserProjectRawValue.project, {
        validators: [Validators.required],
      }),
    });
  }

  getDayUserProject(form: DayUserProjectFormGroup): IDayUserProject | NewDayUserProject {
    return form.getRawValue() as IDayUserProject | NewDayUserProject;
  }

  resetForm(form: DayUserProjectFormGroup, dayUserProject: DayUserProjectFormGroupInput): void {
    const dayUserProjectRawValue = { ...this.getFormDefaults(), ...dayUserProject };
    form.reset(
      {
        ...dayUserProjectRawValue,
        id: { value: dayUserProjectRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DayUserProjectFormDefaults {
    return {
      id: null,
    };
  }
}
