import { IDayUserProject } from 'app/entities/day-user-project/day-user-project.model';

export interface ITask {
  id: number;
  text?: string | null;
  dayUserProject?: Pick<IDayUserProject, 'id'> | null;
}

export type NewTask = Omit<ITask, 'id'> & { id: null };
