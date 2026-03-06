import { IStudent } from 'app/entities/student/student.model';
import { IDisciplina } from 'app/entities/disciplina/disciplina.model';

export interface IGrade {
  id: number;
  value?: number | null;
  finished?: boolean | null;
  student?: Pick<IStudent, 'id'> | null;
  disciplina?: Pick<IDisciplina, 'id'> | null;
}

export type NewGrade = Omit<IGrade, 'id'> & { id: null };
