import { IStudentAddress, NewStudentAddress } from './student-address.model';

export const sampleWithRequiredData: IStudentAddress = {
  id: 25361,
};

export const sampleWithPartialData: IStudentAddress = {
  id: 16880,
  postalCode: 'degenerate',
  city: 'Loraineburgh',
  country: 'Virgin Islands, British',
};

export const sampleWithFullData: IStudentAddress = {
  id: 31220,
  adressLine: 'vainly',
  postalCode: 'short',
  city: 'Camarillo',
  country: 'Heard Island and McDonald Islands',
};

export const sampleWithNewData: NewStudentAddress = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
