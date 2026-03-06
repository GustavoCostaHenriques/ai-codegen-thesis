import dayjs from 'dayjs/esm';

import { IDayPlan, NewDayPlan } from './day-plan.model';

export const sampleWithRequiredData: IDayPlan = {
  id: 18410,
  date: dayjs('2026-02-02'),
};

export const sampleWithPartialData: IDayPlan = {
  id: 2821,
  date: dayjs('2026-02-03'),
};

export const sampleWithFullData: IDayPlan = {
  id: 130,
  date: dayjs('2026-02-02'),
};

export const sampleWithNewData: NewDayPlan = {
  date: dayjs('2026-02-03'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
