import { IAppUser } from 'app/entities/app-user/app-user.model';
import { IDayPlan } from 'app/entities/day-plan/day-plan.model';

export interface IDayUser {
  id: number;
  user?: Pick<IAppUser, 'id'> | null;
  dayPlan?: Pick<IDayPlan, 'id'> | null;
}

export type NewDayUser = Omit<IDayUser, 'id'> & { id: null };
