import { ICourse, NewCourse } from './course.model';

export const sampleWithRequiredData: ICourse = {
  id: 8824,
  name: 'radiant',
};

export const sampleWithPartialData: ICourse = {
  id: 1689,
  name: 'while',
};

export const sampleWithFullData: ICourse = {
  id: 30968,
  name: 'weakly',
};

export const sampleWithNewData: NewCourse = {
  name: 'unto',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
