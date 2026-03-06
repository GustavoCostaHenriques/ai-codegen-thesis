import type { APIRequestContext, APIResponse } from '@playwright/test';
import { expect } from '@playwright/test';

export interface Credentials {
  username: string;
  password: string;
}

export interface SessionResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: {
    accountId: string;
    personId: string;
    name: string;
    username: string;
    email: string;
    role: 'ADMIN' | 'VIEWER';
    status: 'ACTIVE' | 'INACTIVE';
  };
}

export interface PersonSummary {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'VIEWER';
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Person extends PersonSummary {
  accountId: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  code: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface WeekSummary {
  id: string;
  code: string;
  weekStart: string;
  weekEnd: string;
  status: 'PLANNED' | 'COMPLETED';
}

export interface Task {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlanningAssignment {
  id: string;
  person: PersonSummary;
  estimatedHours: number;
  actualHours: number | null;
  tasks: Task[];
}

export interface DayProject {
  id: string;
  project: ProjectSummary;
  assignments: PlanningAssignment[];
}

export interface DayPlan {
  id: string;
  dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';
  date: string;
  projects: DayProject[];
}

export interface WeekPlanningBoard {
  week: WeekSummary;
  readOnly: boolean;
  dayPlans: DayPlan[];
}

interface PagedResponse<T> {
  content: T[];
}

interface RequestOptions {
  token?: string;
  data?: unknown;
  expectedStatus?: number;
}

export class WeeklyPlanningApi {
  constructor(private readonly request: APIRequestContext) {}

  async login(credentials: Credentials): Promise<SessionResponse> {
    return this.readJson<SessionResponse>('POST', '/sessions', {
      data: credentials,
      expectedStatus: 201,
    });
  }

  async logout(token: string): Promise<void> {
    await this.requestOk('DELETE', '/sessions/current', { token, expectedStatus: 204 });
  }

  async createPerson(
    token: string,
    payload: {
      name: string;
      username: string;
      email: string;
      password: string;
      role: 'ADMIN' | 'VIEWER';
      status: 'ACTIVE' | 'INACTIVE';
    },
  ): Promise<Person> {
    return this.readJson<Person>('POST', '/people', { token, data: payload, expectedStatus: 201 });
  }

  async getPerson(token: string, personId: string): Promise<Person> {
    return this.readJson<Person>('GET', `/people/${personId}`, { token, expectedStatus: 200 });
  }

  async deletePerson(token: string, personId: string): Promise<void> {
    await this.requestOk('DELETE', `/people/${personId}`, { token, expectedStatus: 204 });
  }

  async createProject(
    token: string,
    payload: {
      name: string;
      code: string;
      status: 'ACTIVE' | 'INACTIVE';
    },
  ): Promise<ProjectSummary> {
    return this.readJson<ProjectSummary>('POST', '/projects', { token, data: payload, expectedStatus: 201 });
  }

  async deleteProject(token: string, projectId: string): Promise<void> {
    await this.requestOk('DELETE', `/projects/${projectId}`, { token, expectedStatus: 204 });
  }

  async createWeek(
    token: string,
    payload: {
      weekStart: string;
      weekEnd: string;
      status?: 'PLANNED' | 'COMPLETED';
    },
  ): Promise<WeekSummary> {
    return this.readJson<WeekSummary>('POST', '/weeks', { token, data: payload, expectedStatus: 201 });
  }

  async updateWeek(
    token: string,
    weekId: string,
    payload: {
      weekStart: string;
      weekEnd: string;
      status: 'PLANNED' | 'COMPLETED';
    },
  ): Promise<WeekSummary> {
    return this.readJson<WeekSummary>('PUT', `/weeks/${weekId}`, { token, data: payload, expectedStatus: 200 });
  }

  async deleteWeek(token: string, weekId: string): Promise<void> {
    await this.requestOk('DELETE', `/weeks/${weekId}`, { token, expectedStatus: 204 });
  }

  async getPlanningBoard(token: string, weekId: string): Promise<WeekPlanningBoard> {
    return this.readJson<WeekPlanningBoard>('GET', `/weeks/${weekId}/planning-board`, { token, expectedStatus: 200 });
  }

  async ensureProjectOnDay(token: string, weekId: string, dayPlanId: string, projectId: string): Promise<DayProject> {
    return this.readJson<DayProject>('PUT', `/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}`, {
      token,
      data: {},
      expectedStatus: 200,
    });
  }

  async createAssignment(
    token: string,
    weekId: string,
    dayPlanId: string,
    projectId: string,
    payload: {
      personId: string;
      estimatedHours: number;
      actualHours: number | null;
      taskDescription: string;
    },
  ): Promise<PlanningAssignment> {
    return this.readJson<PlanningAssignment>(
      'POST',
      `/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}/assignments`,
      {
        token,
        data: payload,
        expectedStatus: 201,
      },
    );
  }

  async tryCreateProject(
    token: string,
    payload: {
      name: string;
      code: string;
      status: 'ACTIVE' | 'INACTIVE';
    },
  ): Promise<APIResponse> {
    return this.request.post('/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    });
  }

  async exportStatistics(token: string): Promise<APIResponse> {
    return this.request.post('/statistics-exports', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async listPeople(token: string, query = ''): Promise<PersonSummary[]> {
    const response = await this.readJson<PagedResponse<PersonSummary>>('GET', `/people?size=200&search=${encodeURIComponent(query)}`, {
      token,
      expectedStatus: 200,
    });
    return response.content;
  }

  private async requestOk(method: 'DELETE', path: string, options: RequestOptions): Promise<void> {
    const response = await this.execute(method, path, options);
    expect(response.status(), `${method} ${path} should return ${options.expectedStatus ?? 204}`).toBe(options.expectedStatus ?? 204);
  }

  private async readJson<T>(
    method: 'GET' | 'POST' | 'PUT',
    path: string,
    options: RequestOptions,
  ): Promise<T> {
    const response = await this.execute(method, path, options);
    expect(response.status(), `${method} ${path} should return ${options.expectedStatus ?? 200}`).toBe(options.expectedStatus ?? 200);
    return (await response.json()) as T;
  }

  private execute(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, options: RequestOptions): Promise<APIResponse> {
    const headers = options.token
      ? {
          Authorization: `Bearer ${options.token}`,
        }
      : undefined;

    switch (method) {
      case 'GET':
        return this.request.get(path, { headers });
      case 'POST':
        return this.request.post(path, { headers, data: options.data });
      case 'PUT':
        return this.request.put(path, { headers, data: options.data });
      case 'DELETE':
        return this.request.delete(path, { headers });
    }
  }
}

export function findDayPlan(board: WeekPlanningBoard, dayOfWeek: DayPlan['dayOfWeek']): DayPlan {
  const dayPlan = board.dayPlans.find((item) => item.dayOfWeek === dayOfWeek);
  expect(dayPlan, `Expected ${dayOfWeek} to exist in planning board`).toBeTruthy();
  return dayPlan!;
}
