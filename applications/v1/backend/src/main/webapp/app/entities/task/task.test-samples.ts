import { ITask, NewTask } from './task.model';

export const sampleWithRequiredData: ITask = {
  id: 9181,
  text: 'or consequently',
};

export const sampleWithPartialData: ITask = {
  id: 873,
  text: 'cannon dense',
};

export const sampleWithFullData: ITask = {
  id: 13396,
  text: 'where wherever',
};

export const sampleWithNewData: NewTask = {
  text: 'expostulate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
