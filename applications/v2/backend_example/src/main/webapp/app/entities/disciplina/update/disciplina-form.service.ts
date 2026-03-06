import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDisciplina, NewDisciplina } from '../disciplina.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDisciplina for edit and NewDisciplinaFormGroupInput for create.
 */
type DisciplinaFormGroupInput = IDisciplina | PartialWithRequiredKeyOf<NewDisciplina>;

type DisciplinaFormDefaults = Pick<NewDisciplina, 'id'>;

type DisciplinaFormGroupContent = {
  id: FormControl<IDisciplina['id'] | NewDisciplina['id']>;
  name: FormControl<IDisciplina['name']>;
  capacity: FormControl<IDisciplina['capacity']>;
  credits: FormControl<IDisciplina['credits']>;
  teacherName: FormControl<IDisciplina['teacherName']>;
  course: FormControl<IDisciplina['course']>;
};

export type DisciplinaFormGroup = FormGroup<DisciplinaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DisciplinaFormService {
  createDisciplinaFormGroup(disciplina: DisciplinaFormGroupInput = { id: null }): DisciplinaFormGroup {
    const disciplinaRawValue = {
      ...this.getFormDefaults(),
      ...disciplina,
    };
    return new FormGroup<DisciplinaFormGroupContent>({
      id: new FormControl(
        { value: disciplinaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(disciplinaRawValue.name, {
        validators: [Validators.required],
      }),
      capacity: new FormControl(disciplinaRawValue.capacity, {
        validators: [Validators.required],
      }),
      credits: new FormControl(disciplinaRawValue.credits, {
        validators: [Validators.required],
      }),
      teacherName: new FormControl(disciplinaRawValue.teacherName, {
        validators: [Validators.required],
      }),
      course: new FormControl(disciplinaRawValue.course, {
        validators: [Validators.required],
      }),
    });
  }

  getDisciplina(form: DisciplinaFormGroup): IDisciplina | NewDisciplina {
    return form.getRawValue() as IDisciplina | NewDisciplina;
  }

  resetForm(form: DisciplinaFormGroup, disciplina: DisciplinaFormGroupInput): void {
    const disciplinaRawValue = { ...this.getFormDefaults(), ...disciplina };
    form.reset(
      {
        ...disciplinaRawValue,
        id: { value: disciplinaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DisciplinaFormDefaults {
    return {
      id: null,
    };
  }
}
