import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 9907,
};

export const sampleWithPartialData: IGrade = {
  id: 17519,
};

export const sampleWithFullData: IGrade = {
  id: 2320,
  value: 4,
  finished: true,
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
