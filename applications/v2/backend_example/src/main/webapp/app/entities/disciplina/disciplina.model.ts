import { ICourse } from 'app/entities/course/course.model';

export interface IDisciplina {
  id: number;
  name?: string | null;
  capacity?: number | null;
  credits?: number | null;
  teacherName?: string | null;
  course?: Pick<ICourse, 'id'> | null;
}

export type NewDisciplina = Omit<IDisciplina, 'id'> & { id: null };
