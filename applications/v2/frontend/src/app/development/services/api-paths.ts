import { environment } from '../../../environments/environment';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const API_BASE_PATH = environment.apiBasePath;

export const API_PATHS = {
  authLogin: '/auth/login',
  accounts: '/accounts',
  people: '/people',
  personById: (personId: string): string => `/people/${personId}`,
  projects: '/projects',
  projectById: (projectId: string): string => `/projects/${projectId}`,
  weeks: '/weeks',
  weekById: (weekId: string): string => `/weeks/${weekId}`,
  weekPlanning: (weekId: string): string => `/weeks/${weekId}/planning`,
  weekDayPeople: (weekId: string, date: string): string => `/weeks/${weekId}/days/${date}/people`,
  weekDayPerson: (weekId: string, date: string, personId: string): string =>
    `/weeks/${weekId}/days/${date}/people/${personId}`,
  weekDayPersonProjects: (weekId: string, date: string, personId: string): string =>
    `/weeks/${weekId}/days/${date}/people/${personId}/projects`,
  weekDayPersonProject: (weekId: string, date: string, personId: string, projectId: string): string =>
    `/weeks/${weekId}/days/${date}/people/${personId}/projects/${projectId}`,
  weekDayPersonProjectTasks: (weekId: string, date: string, personId: string, projectId: string): string =>
    `/weeks/${weekId}/days/${date}/people/${personId}/projects/${projectId}/tasks`,
  weekDayPersonProjectTask: (
    weekId: string,
    date: string,
    personId: string,
    projectId: string,
    taskId: string,
  ): string => `/weeks/${weekId}/days/${date}/people/${personId}/projects/${projectId}/tasks/${taskId}`,
} as const;
