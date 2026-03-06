import { IAppUser, NewAppUser } from './app-user.model';

export const sampleWithRequiredData: IAppUser = {
  id: 19407,
  name: 'nephew gah cutover',
};

export const sampleWithPartialData: IAppUser = {
  id: 10877,
  name: 'whimsical bitterly up',
};

export const sampleWithFullData: IAppUser = {
  id: 1902,
  name: 'judgementally',
};

export const sampleWithNewData: NewAppUser = {
  name: 'economise hepatitis what',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
