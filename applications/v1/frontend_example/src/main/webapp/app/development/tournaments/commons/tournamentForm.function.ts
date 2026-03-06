import {
  ButtonToggleObject,
  DisplayingObject,
  FormDropdownField,
  FormFieldsType,
  FormTextInputField,
  FormTextInputTypeEnum,
  FormToggleField,
} from '@trustsystems/dynamic-lib';

export function TournamentForm(): Array<FormFieldsType>[] {
  let form: Array<FormFieldsType>[] = [];

  const categoryData: Array<DisplayingObject> = [
    {
      identifier: 'Grand Slam',
      displayingName: 'Grand Slam',
    },
    {
      identifier: 'ATP 1000',
      displayingName: 'ATP 1000',
    },
    {
      identifier: 'ATP 500',
      displayingName: 'ATP 500',
    },
    {
      identifier: 'ATP 250',
      displayingName: 'ATP 250',
    },
    {
      identifier: 'Challenger',
      displayingName: 'Challenger',
    },
    {
      identifier: 'Exibition',
      displayingName: 'Exibition',
    },
    {
      identifier: 'ATP Finals',
      displayingName: 'ATP Finals',
    },
    {
      identifier: 'Next Gen Finals',
      displayingName: 'Next Gen Finals',
    },
  ];

  const activeData: Array<ButtonToggleObject> = [
    {
      identifier: true,
      displayingName: 'True',
    },
    {
      identifier: false,
      displayingName: 'False',
    },
  ];

  const name = new FormTextInputField('name', 'tournament.name', 'tournament.name', 'tournament.name');
  name.fieldClass = 'col-4';
  name.required = true;

  const location = new FormTextInputField('location', 'tournament.location', 'tournament.location', 'tournament.location');
  location.fieldClass = 'col-4';
  location.required = true;

  const category = new FormDropdownField('category', 'tournament.category', 'tournament.category', 'tournament.category', categoryData);
  category.fieldClass = 'col-4';
  category.required = true;

  const prize = new FormTextInputField('prize', 'tournament.prize', 'tournament.prize', 'tournament.prize');
  prize.fieldClass = 'col-4';
  prize.type = FormTextInputTypeEnum.Number;
  prize.required = true;

  const active = new FormToggleField('active', 'tournament.active', 'tournament.active', 'tournament.active', activeData);
  active.fieldClass = 'col-4';

  form = [[name], [location], [category], [prize], [active]];

  return form;
}
