import { IStudentAddress } from 'app/entities/student-address/student-address.model';
import { ICourse } from 'app/entities/course/course.model';
import { GenreEnum } from 'app/entities/enumerations/genre-enum.model';

export interface IStudent {
  id: number;
  name?: string | null;
  age?: number | null;
  genre?: keyof typeof GenreEnum | null;
  studentAddress?: Pick<IStudentAddress, 'id'> | null;
  course?: Pick<ICourse, 'id'> | null;
}

export type NewStudent = Omit<IStudent, 'id'> & { id: null };
