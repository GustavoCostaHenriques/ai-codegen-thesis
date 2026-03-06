import dayjs from 'dayjs/esm';
import { IWeek } from 'app/entities/week/week.model';

export interface IDayPlan {
  id: number;
  date?: dayjs.Dayjs | null;
  week?: Pick<IWeek, 'id'> | null;
}

export type NewDayPlan = Omit<IDayPlan, 'id'> & { id: null };
