import { IDisciplina, NewDisciplina } from './disciplina.model';

export const sampleWithRequiredData: IDisciplina = {
  id: 23440,
  name: 'supposing dead disloyal',
  capacity: 20271,
  credits: 30099,
  teacherName: 'sturdy phew',
};

export const sampleWithPartialData: IDisciplina = {
  id: 19041,
  name: 'crushing sore parallel',
  capacity: 16881,
  credits: 9054,
  teacherName: 'gee below',
};

export const sampleWithFullData: IDisciplina = {
  id: 486,
  name: 'abseil overconfidently for',
  capacity: 23854,
  credits: 11727,
  teacherName: 'commodity refute intently',
};

export const sampleWithNewData: NewDisciplina = {
  name: 'by stage out',
  capacity: 6807,
  credits: 27592,
  teacherName: 'interviewer reborn mesh',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
