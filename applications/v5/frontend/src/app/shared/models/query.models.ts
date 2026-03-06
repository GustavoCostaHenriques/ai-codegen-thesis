import {
  AccountRole,
  PersonStatus,
  ProjectStatus,
  WeekStatus,
} from './api.models';

export interface PaginationQuery {
  page?: number;
  size?: number;
  sort?: string[];
  search?: string;
}

export interface PeopleQuery extends PaginationQuery {
  status?: PersonStatus;
  role?: AccountRole;
}

export interface ProjectsQuery extends PaginationQuery {
  status?: ProjectStatus;
}

export interface WeeksQuery extends PaginationQuery {
  status?: WeekStatus;
  weekStartFrom?: string;
  weekStartTo?: string;
}
