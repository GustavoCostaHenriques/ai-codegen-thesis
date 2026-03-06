export const API_BASE_PATH = '/api';

export const API_PATHS = {
  users: '/users',
  userById: '/users/{userId}',
  projects: '/projects',
  projectById: '/projects/{projectId}',
  weeks: '/weeks',
  weekById: '/weeks/{weekId}',
  weekDuplicate: '/weeks/{weekId}/duplicate',
  weekDays: '/weeks/{weekId}/days',
  dayPlan: '/weeks/{weekId}/days/{date}',
  dayUsers: '/weeks/{weekId}/days/{date}/users',
  dayUserById: '/weeks/{weekId}/days/{date}/users/{userId}',
  dayUserProjects: '/weeks/{weekId}/days/{date}/users/{userId}/projects',
  dayUserProjectById: '/weeks/{weekId}/days/{date}/users/{userId}/projects/{projectId}',
  tasks: '/weeks/{weekId}/days/{date}/users/{userId}/projects/{projectId}/tasks',
  taskById:
    '/weeks/{weekId}/days/{date}/users/{userId}/projects/{projectId}/tasks/{taskId}',
} as const;

const encode = (value: string): string => encodeURIComponent(value);

export const apiPath = {
  users: (): string => API_PATHS.users,
  userById: (userId: string): string => API_PATHS.userById.replace('{userId}', encode(userId)),
  projects: (): string => API_PATHS.projects,
  projectById: (projectId: string): string =>
    API_PATHS.projectById.replace('{projectId}', encode(projectId)),
  weeks: (): string => API_PATHS.weeks,
  weekById: (weekId: string): string => API_PATHS.weekById.replace('{weekId}', encode(weekId)),
  weekDuplicate: (weekId: string): string =>
    API_PATHS.weekDuplicate.replace('{weekId}', encode(weekId)),
  weekDays: (weekId: string): string => API_PATHS.weekDays.replace('{weekId}', encode(weekId)),
  dayPlan: (weekId: string, date: string): string =>
    API_PATHS.dayPlan.replace('{weekId}', encode(weekId)).replace('{date}', encode(date)),
  dayUsers: (weekId: string, date: string): string =>
    API_PATHS.dayUsers.replace('{weekId}', encode(weekId)).replace('{date}', encode(date)),
  dayUserById: (weekId: string, date: string, userId: string): string =>
    API_PATHS.dayUserById
      .replace('{weekId}', encode(weekId))
      .replace('{date}', encode(date))
      .replace('{userId}', encode(userId)),
  dayUserProjects: (weekId: string, date: string, userId: string): string =>
    API_PATHS.dayUserProjects
      .replace('{weekId}', encode(weekId))
      .replace('{date}', encode(date))
      .replace('{userId}', encode(userId)),
  dayUserProjectById: (
    weekId: string,
    date: string,
    userId: string,
    projectId: string,
  ): string =>
    API_PATHS.dayUserProjectById
      .replace('{weekId}', encode(weekId))
      .replace('{date}', encode(date))
      .replace('{userId}', encode(userId))
      .replace('{projectId}', encode(projectId)),
  tasks: (weekId: string, date: string, userId: string, projectId: string): string =>
    API_PATHS.tasks
      .replace('{weekId}', encode(weekId))
      .replace('{date}', encode(date))
      .replace('{userId}', encode(userId))
      .replace('{projectId}', encode(projectId)),
  taskById: (
    weekId: string,
    date: string,
    userId: string,
    projectId: string,
    taskId: string,
  ): string =>
    API_PATHS.taskById
      .replace('{weekId}', encode(weekId))
      .replace('{date}', encode(date))
      .replace('{userId}', encode(userId))
      .replace('{projectId}', encode(projectId))
      .replace('{taskId}', encode(taskId)),
};
