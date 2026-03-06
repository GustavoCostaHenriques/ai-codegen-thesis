import { IDayUser } from 'app/entities/day-user/day-user.model';
import { IProject } from 'app/entities/project/project.model';

export interface IDayUserProject {
  id: number;
  dayUser?: Pick<IDayUser, 'id'> | null;
  project?: Pick<IProject, 'id'> | null;
}

export type NewDayUserProject = Omit<IDayUserProject, 'id'> & { id: null };
