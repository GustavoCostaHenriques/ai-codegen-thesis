import dayjs from 'dayjs/esm';

export interface IWeek {
  id: number;
  label?: string | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
}

export type NewWeek = Omit<IWeek, 'id'> & { id: null };
