import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 15380,
  name: 'new instead married',
  age: 10511,
};

export const sampleWithPartialData: IStudent = {
  id: 28775,
  name: 'fly gah',
  age: 8173,
  genre: 'OTHER',
};

export const sampleWithFullData: IStudent = {
  id: 6617,
  name: 'pleasant plain petty',
  age: 393,
  genre: 'FEMALE',
};

export const sampleWithNewData: NewStudent = {
  name: 'gad even aboard',
  age: 295,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
