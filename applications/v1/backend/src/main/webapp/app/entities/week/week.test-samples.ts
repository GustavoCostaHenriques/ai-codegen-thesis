import dayjs from 'dayjs/esm';

import { IWeek, NewWeek } from './week.model';

export const sampleWithRequiredData: IWeek = {
  id: 29439,
  label: 'oxidise unto',
  startDate: dayjs('2026-02-03'),
  endDate: dayjs('2026-02-03'),
};

export const sampleWithPartialData: IWeek = {
  id: 14677,
  label: 'neatly circular abseil',
  startDate: dayjs('2026-02-03'),
  endDate: dayjs('2026-02-03'),
};

export const sampleWithFullData: IWeek = {
  id: 17248,
  label: 'er disgorge',
  startDate: dayjs('2026-02-02'),
  endDate: dayjs('2026-02-02'),
};

export const sampleWithNewData: NewWeek = {
  label: 'please',
  startDate: dayjs('2026-02-03'),
  endDate: dayjs('2026-02-03'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
