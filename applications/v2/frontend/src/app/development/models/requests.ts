import { PersonStatus } from './person';
import { ProjectStatus } from './project';
import { WeekStatus } from './week';

export interface AddPersonToDayRequest {
  personId: string;
}

export interface AddProjectToPersonRequest {
  projectId: string;
}

export interface AddTaskRequest {
  description: string;
}

export interface PeopleQuery {
  [key: string]: string | number | string[] | undefined;
  page?: number;
  size?: number;
  sort?: string[];
  status?: PersonStatus;
  q?: string;
}

export interface ProjectsQuery {
  [key: string]: string | number | string[] | undefined;
  page?: number;
  size?: number;
  sort?: string[];
  status?: ProjectStatus;
  ownerId?: string;
  q?: string;
}

export interface WeeksQuery {
  [key: string]: string | number | string[] | undefined;
  page?: number;
  size?: number;
  sort?: string[];
  status?: WeekStatus;
  startDateFrom?: string;
  startDateTo?: string;
}
