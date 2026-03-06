import { IDayUserProject, NewDayUserProject } from './day-user-project.model';

export const sampleWithRequiredData: IDayUserProject = {
  id: 30011,
};

export const sampleWithPartialData: IDayUserProject = {
  id: 4189,
};

export const sampleWithFullData: IDayUserProject = {
  id: 19705,
};

export const sampleWithNewData: NewDayUserProject = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
