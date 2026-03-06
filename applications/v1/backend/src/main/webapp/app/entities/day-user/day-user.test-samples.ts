import { IDayUser, NewDayUser } from './day-user.model';

export const sampleWithRequiredData: IDayUser = {
  id: 29221,
};

export const sampleWithPartialData: IDayUser = {
  id: 15585,
};

export const sampleWithFullData: IDayUser = {
  id: 4116,
};

export const sampleWithNewData: NewDayUser = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
