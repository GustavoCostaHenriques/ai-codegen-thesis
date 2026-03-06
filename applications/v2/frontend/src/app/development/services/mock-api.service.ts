import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  AccountCreateRequest,
  AccountResponse,
  LoginRequest,
  LoginResponse,
  StoredAccount,
} from '../models/account';
import { DayPerson, DayPersonProject, Task, WeekPlanning } from '../models/planning';
import {
  PeoplePage,
  Person,
  PersonCreateRequest,
  PersonSummary,
  PersonUpdateRequest,
} from '../models/person';
import {
  Project,
  ProjectCreateRequest,
  ProjectsPage,
  ProjectSummary,
  ProjectUpdateRequest,
} from '../models/project';
import { AddPersonToDayRequest, AddProjectToPersonRequest, AddTaskRequest } from '../models/requests';
import { Week, WeekCreateRequest, WeeksPage, WeekStatus, WeekUpdateRequest } from '../models/week';
import { API_PATHS, HttpMethod } from './api-paths';

type QueryParams = Record<string, string | number | boolean | string[] | undefined>;

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  private readonly latencyMs = 120;

  private readonly seedIds = {
    accounts: {
      admin: '11111111-1111-4111-8111-111111111111',
      viewer: '11111111-1111-4111-8111-222222222222',
    },
    people: {
      ana: '22222222-2222-4222-8222-111111111111',
      rui: '22222222-2222-4222-8222-222222222222',
      maria: '22222222-2222-4222-8222-333333333333',
      luis: '22222222-2222-4222-8222-444444444444',
      sofia: '22222222-2222-4222-8222-555555555555',
    },
    projects: {
      az: '33333333-3333-4333-8333-111111111111',
      inf: '33333333-3333-4333-8333-222222222222',
      ops: '33333333-3333-4333-8333-333333333333',
      data: '33333333-3333-4333-8333-444444444444',
      sec: '33333333-3333-4333-8333-555555555555',
    },
    weeks: {
      w06: '44444444-4444-4444-8444-111111111111',
      w05: '44444444-4444-4444-8444-222222222222',
    },
  } as const;

  private accounts: StoredAccount[] = [
    {
      id: this.seedIds.accounts.admin,
      username: 'admin',
      password: 'admin12345',
      role: 'ADMIN',
    },
    {
      id: this.seedIds.accounts.viewer,
      username: 'viewer',
      password: 'viewer12345',
      role: 'VIEWER',
    },
  ];

  private people: Person[] = [
    {
      id: this.seedIds.people.ana,
      name: 'Ana Silva',
      email: 'ana.silva@azores.gov',
      role: 'Coordinator',
      status: 'ACTIVE',
    },
    {
      id: this.seedIds.people.rui,
      name: 'Rui Costa',
      email: 'rui.costa@azores.gov',
      role: 'Analyst',
      status: 'INACTIVE',
    },
    {
      id: this.seedIds.people.maria,
      name: 'Maria Sousa',
      email: 'maria.sousa@azores.gov',
      role: 'Architect',
      status: 'ACTIVE',
    },
    {
      id: this.seedIds.people.luis,
      name: 'Luis Pereira',
      email: 'luis.pereira@azores.gov',
      role: 'Security Engineer',
      status: 'ACTIVE',
    },
    {
      id: this.seedIds.people.sofia,
      name: 'Sofia Matos',
      email: 'sofia.matos@azores.gov',
      role: 'QA Engineer',
      status: 'ACTIVE',
    },
  ];

  private projects: Project[] = [
    {
      id: this.seedIds.projects.az,
      name: 'Azores Portal',
      code: 'AZ-PORT',
      owner: {
        id: this.seedIds.people.ana,
        name: 'Ana Silva',
      },
      status: 'ACTIVE',
    },
    {
      id: this.seedIds.projects.inf,
      name: 'Infra Upgrade',
      code: 'INF-UP',
      owner: {
        id: this.seedIds.people.rui,
        name: 'Rui Costa',
      },
      status: 'INACTIVE',
    },
    {
      id: this.seedIds.projects.ops,
      name: 'Operations API',
      code: 'OPS-API',
      owner: {
        id: this.seedIds.people.maria,
        name: 'Maria Sousa',
      },
      status: 'ACTIVE',
    },
    {
      id: this.seedIds.projects.data,
      name: 'Data Hub',
      code: 'DATA-HUB',
      owner: {
        id: this.seedIds.people.maria,
        name: 'Maria Sousa',
      },
      status: 'ACTIVE',
    },
    {
      id: this.seedIds.projects.sec,
      name: 'Security Audit',
      code: 'SEC-AUDIT',
      owner: {
        id: this.seedIds.people.luis,
        name: 'Luis Pereira',
      },
      status: 'ACTIVE',
    },
  ];

  private weeks: WeekPlanning[] = [
    {
      id: this.seedIds.weeks.w06,
      startDate: '2026-02-02',
      endDate: '2026-02-06',
      status: 'PLANNED',
      days: [
        {
          date: '2026-02-02',
          people: [
            {
              person: { id: this.seedIds.people.ana, name: 'Ana Silva' },
              projects: [
                {
                  project: { id: this.seedIds.projects.az, name: 'Azores Portal', code: 'AZ-PORT' },
                  tasks: [
                    { id: this.createUuid(), description: 'Update login flow' },
                    { id: this.createUuid(), description: 'Fix validation' },
                  ],
                },
                {
                  project: { id: this.seedIds.projects.ops, name: 'Operations API', code: 'OPS-API' },
                  tasks: [{ id: this.createUuid(), description: 'Plan endpoints' }],
                },
              ],
            },
            {
              person: { id: this.seedIds.people.rui, name: 'Rui Costa' },
              projects: [
                {
                  project: { id: this.seedIds.projects.inf, name: 'Infra Upgrade', code: 'INF-UP' },
                  tasks: [{ id: this.createUuid(), description: 'Review network plan' }],
                },
                {
                  project: { id: this.seedIds.projects.az, name: 'Azores Portal', code: 'AZ-PORT' },
                  tasks: [{ id: this.createUuid(), description: 'Draft content' }],
                },
              ],
            },
          ],
        },
        {
          date: '2026-02-03',
          people: [
            {
              person: { id: this.seedIds.people.ana, name: 'Ana Silva' },
              projects: [
                {
                  project: { id: this.seedIds.projects.ops, name: 'Operations API', code: 'OPS-API' },
                  tasks: [
                    { id: this.createUuid(), description: 'Write DTOs' },
                    { id: this.createUuid(), description: 'Add validations' },
                  ],
                },
              ],
            },
          ],
        },
        {
          date: '2026-02-04',
          people: [
            {
              person: { id: this.seedIds.people.maria, name: 'Maria Sousa' },
              projects: [
                {
                  project: { id: this.seedIds.projects.data, name: 'Data Hub', code: 'DATA-HUB' },
                  tasks: [
                    { id: this.createUuid(), description: 'Clean imports' },
                    { id: this.createUuid(), description: 'Update docs' },
                  ],
                },
              ],
            },
          ],
        },
        {
          date: '2026-02-05',
          people: [
            {
              person: { id: this.seedIds.people.luis, name: 'Luis Pereira' },
              projects: [
                {
                  project: { id: this.seedIds.projects.sec, name: 'Security Audit', code: 'SEC-AUDIT' },
                  tasks: [
                    { id: this.createUuid(), description: 'Review logs' },
                    { id: this.createUuid(), description: 'Plan controls' },
                  ],
                },
              ],
            },
          ],
        },
        {
          date: '2026-02-06',
          people: [
            {
              person: { id: this.seedIds.people.sofia, name: 'Sofia Matos' },
              projects: [
                {
                  project: { id: this.seedIds.projects.az, name: 'Azores Portal', code: 'AZ-PORT' },
                  tasks: [
                    { id: this.createUuid(), description: 'QA regression' },
                    { id: this.createUuid(), description: 'Release notes' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: this.seedIds.weeks.w05,
      startDate: '2026-01-26',
      endDate: '2026-01-30',
      status: 'COMPLETED',
      days: [
        { date: '2026-01-26', people: [] },
        { date: '2026-01-27', people: [] },
        { date: '2026-01-28', people: [] },
        { date: '2026-01-29', people: [] },
        { date: '2026-01-30', people: [] },
      ],
    },
  ];

  request<T>(method: HttpMethod, path: string, body?: unknown, query?: QueryParams): Observable<T> {
    try {
      const response = this.dispatch(method, this.normalizePath(path), body, query);

      if (response === undefined) {
        return of(undefined as T).pipe(delay(this.latencyMs));
      }

      return of(this.clone(response as T)).pipe(delay(this.latencyMs));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected mock API error.';
      return throwError(() => new Error(message));
    }
  }

  private dispatch(method: HttpMethod, path: string, body?: unknown, query?: QueryParams): unknown {
    if (method === 'POST' && path === API_PATHS.authLogin) {
      return this.login(this.requireBody<LoginRequest>(body));
    }

    if (method === 'POST' && path === API_PATHS.accounts) {
      return this.createAccount(this.requireBody<AccountCreateRequest>(body));
    }

    if (path === API_PATHS.people) {
      if (method === 'GET') {
        return this.listPeople(query);
      }
      if (method === 'POST') {
        return this.createPerson(this.requireBody<PersonCreateRequest>(body));
      }
    }

    const personMatch = path.match(/^\/people\/([^/]+)$/);
    if (personMatch) {
      const personId = personMatch[1];
      if (method === 'GET') {
        return this.getPerson(personId);
      }
      if (method === 'PUT') {
        return this.updatePerson(personId, this.requireBody<PersonUpdateRequest>(body));
      }
      if (method === 'DELETE') {
        this.deletePerson(personId);
        return undefined;
      }
    }

    if (path === API_PATHS.projects) {
      if (method === 'GET') {
        return this.listProjects(query);
      }
      if (method === 'POST') {
        return this.createProject(this.requireBody<ProjectCreateRequest>(body));
      }
    }

    const projectMatch = path.match(/^\/projects\/([^/]+)$/);
    if (projectMatch) {
      const projectId = projectMatch[1];
      if (method === 'GET') {
        return this.getProject(projectId);
      }
      if (method === 'PUT') {
        return this.updateProject(projectId, this.requireBody<ProjectUpdateRequest>(body));
      }
      if (method === 'DELETE') {
        this.deleteProject(projectId);
        return undefined;
      }
    }

    if (path === API_PATHS.weeks) {
      if (method === 'GET') {
        return this.listWeeks(query);
      }
      if (method === 'POST') {
        return this.createWeek(this.requireBody<WeekCreateRequest>(body));
      }
    }

    const weekPlanningMatch = path.match(/^\/weeks\/([^/]+)\/planning$/);
    if (weekPlanningMatch && method === 'GET') {
      return this.getWeekPlanning(weekPlanningMatch[1]);
    }

    const addPersonMatch = path.match(/^\/weeks\/([^/]+)\/days\/([^/]+)\/people$/);
    if (addPersonMatch && method === 'POST') {
      return this.addPersonToDay(addPersonMatch[1], addPersonMatch[2], this.requireBody<AddPersonToDayRequest>(body));
    }

    const removePersonMatch = path.match(/^\/weeks\/([^/]+)\/days\/([^/]+)\/people\/([^/]+)$/);
    if (removePersonMatch && method === 'DELETE') {
      this.removePersonFromDay(removePersonMatch[1], removePersonMatch[2], removePersonMatch[3]);
      return undefined;
    }

    const addProjectMatch = path.match(/^\/weeks\/([^/]+)\/days\/([^/]+)\/people\/([^/]+)\/projects$/);
    if (addProjectMatch && method === 'POST') {
      return this.addProjectToPerson(
        addProjectMatch[1],
        addProjectMatch[2],
        addProjectMatch[3],
        this.requireBody<AddProjectToPersonRequest>(body),
      );
    }

    const removeProjectMatch = path.match(/^\/weeks\/([^/]+)\/days\/([^/]+)\/people\/([^/]+)\/projects\/([^/]+)$/);
    if (removeProjectMatch && method === 'DELETE') {
      this.removeProjectFromPerson(removeProjectMatch[1], removeProjectMatch[2], removeProjectMatch[3], removeProjectMatch[4]);
      return undefined;
    }

    const addTaskMatch = path.match(/^\/weeks\/([^/]+)\/days\/([^/]+)\/people\/([^/]+)\/projects\/([^/]+)\/tasks$/);
    if (addTaskMatch && method === 'POST') {
      return this.addTaskToProject(
        addTaskMatch[1],
        addTaskMatch[2],
        addTaskMatch[3],
        addTaskMatch[4],
        this.requireBody<AddTaskRequest>(body),
      );
    }

    const removeTaskMatch = path.match(
      /^\/weeks\/([^/]+)\/days\/([^/]+)\/people\/([^/]+)\/projects\/([^/]+)\/tasks\/([^/]+)$/,
    );
    if (removeTaskMatch && method === 'DELETE') {
      this.removeTaskFromProject(removeTaskMatch[1], removeTaskMatch[2], removeTaskMatch[3], removeTaskMatch[4], removeTaskMatch[5]);
      return undefined;
    }

    const weekMatch = path.match(/^\/weeks\/([^/]+)$/);
    if (weekMatch) {
      const weekId = weekMatch[1];
      if (method === 'GET') {
        return this.getWeek(weekId);
      }
      if (method === 'PUT') {
        return this.updateWeek(weekId, this.requireBody<WeekUpdateRequest>(body));
      }
      if (method === 'DELETE') {
        this.deleteWeek(weekId);
        return undefined;
      }
    }

    throw new Error(`No mock handler found for ${method} ${path}.`);
  }

  private login(request: LoginRequest): LoginResponse {
    const username = request.username.trim().toLowerCase();
    const account = this.accounts.find(item => item.username.toLowerCase() === username && item.password === request.password);

    if (!account) {
      throw new Error('Invalid username or password.');
    }

    return {
      accessToken: `mock-token-${this.createUuid()}`,
      tokenType: 'Bearer',
      expiresIn: 3600,
      account: {
        id: account.id,
        username: account.username,
        role: account.role,
      },
    };
  }

  private createAccount(request: AccountCreateRequest): AccountResponse {
    if (!request.username.trim() || !request.password.trim()) {
      throw new Error('Username and password are required.');
    }

    const duplicated = this.accounts.some(
      account => account.username.toLowerCase() === request.username.trim().toLowerCase(),
    );

    if (duplicated) {
      throw new Error('Username already exists.');
    }

    const account: StoredAccount = {
      id: this.createUuid(),
      username: request.username.trim(),
      password: request.password,
      role: request.role,
    };

    this.accounts = [account, ...this.accounts];

    return {
      id: account.id,
      username: account.username,
      role: account.role,
    };
  }

  private listPeople(query?: QueryParams): PeoplePage {
    let items = [...this.people];
    const status = query?.['status'];
    const search = query?.['q'];
    const page = this.toNumber(query?.['page'], 0);
    const size = this.toNumber(query?.['size'], 20);

    if (typeof status === 'string' && (status === 'ACTIVE' || status === 'INACTIVE')) {
      items = items.filter(person => person.status === status);
    }

    if (typeof search === 'string' && search.trim()) {
      const queryTerm = search.trim().toLowerCase();
      items = items.filter(
        person =>
          person.name.toLowerCase().includes(queryTerm) ||
          person.email.toLowerCase().includes(queryTerm) ||
          person.role.toLowerCase().includes(queryTerm),
      );
    }

    items.sort((a, b) => a.name.localeCompare(b.name));

    return this.paginate(items, page, size);
  }

  private createPerson(request: PersonCreateRequest): Person {
    this.validatePersonRequest(request);

    const duplicatedEmail = this.people.some(person => person.email.toLowerCase() === request.email.trim().toLowerCase());
    if (duplicatedEmail) {
      throw new Error('A person with this email already exists.');
    }

    const person: Person = {
      id: this.createUuid(),
      name: request.name.trim(),
      email: request.email.trim(),
      role: request.role.trim(),
      status: request.status,
    };

    this.people = [person, ...this.people];

    return person;
  }

  private getPerson(personId: string): Person {
    return this.findPersonOrThrow(personId);
  }

  private updatePerson(personId: string, request: PersonUpdateRequest): Person {
    this.validatePersonRequest(request);

    const personIndex = this.people.findIndex(person => person.id === personId);
    if (personIndex < 0) {
      throw new Error('Person not found.');
    }

    const duplicatedEmail = this.people.some(
      person => person.id !== personId && person.email.toLowerCase() === request.email.trim().toLowerCase(),
    );
    if (duplicatedEmail) {
      throw new Error('A person with this email already exists.');
    }

    const updatedPerson: Person = {
      ...this.people[personIndex],
      name: request.name.trim(),
      email: request.email.trim(),
      role: request.role.trim(),
      status: request.status,
    };

    this.people[personIndex] = updatedPerson;
    this.syncPersonReferences(updatedPerson);

    return updatedPerson;
  }

  private deletePerson(personId: string): void {
    const personExists = this.people.some(person => person.id === personId);
    if (!personExists) {
      throw new Error('Person not found.');
    }

    const ownedProject = this.projects.find(project => project.owner.id === personId);
    if (ownedProject) {
      throw new Error('Person cannot be deleted while owning a project.');
    }

    this.people = this.people.filter(person => person.id !== personId);

    this.weeks = this.weeks.map(week => ({
      ...week,
      days: week.days.map(day => ({
        ...day,
        people: day.people.filter(item => item.person.id !== personId),
      })),
    }));
  }

  private listProjects(query?: QueryParams): ProjectsPage {
    let items = [...this.projects];
    const status = query?.['status'];
    const ownerId = query?.['ownerId'];
    const search = query?.['q'];
    const page = this.toNumber(query?.['page'], 0);
    const size = this.toNumber(query?.['size'], 20);

    if (typeof status === 'string' && (status === 'ACTIVE' || status === 'INACTIVE')) {
      items = items.filter(project => project.status === status);
    }

    if (typeof ownerId === 'string' && ownerId.trim()) {
      items = items.filter(project => project.owner.id === ownerId);
    }

    if (typeof search === 'string' && search.trim()) {
      const queryTerm = search.trim().toLowerCase();
      items = items.filter(
        project =>
          project.name.toLowerCase().includes(queryTerm) ||
          project.code.toLowerCase().includes(queryTerm) ||
          project.owner.name.toLowerCase().includes(queryTerm),
      );
    }

    items.sort((a, b) => a.name.localeCompare(b.name));

    return this.paginate(items, page, size);
  }

  private createProject(request: ProjectCreateRequest): Project {
    this.validateProjectRequest(request);

    const duplicatedCode = this.projects.some(project => project.code.toLowerCase() === request.code.trim().toLowerCase());
    if (duplicatedCode) {
      throw new Error('A project with this code already exists.');
    }

    const owner = this.findPersonOrThrow(request.ownerId);
    if (owner.status !== 'ACTIVE') {
      throw new Error('Project owner must be ACTIVE.');
    }

    const project: Project = {
      id: this.createUuid(),
      name: request.name.trim(),
      code: request.code.trim().toUpperCase(),
      owner: this.personSummary(owner),
      status: request.status,
    };

    this.projects = [project, ...this.projects];

    return project;
  }

  private getProject(projectId: string): Project {
    return this.findProjectOrThrow(projectId);
  }

  private updateProject(projectId: string, request: ProjectUpdateRequest): Project {
    this.validateProjectRequest(request);

    const projectIndex = this.projects.findIndex(project => project.id === projectId);
    if (projectIndex < 0) {
      throw new Error('Project not found.');
    }

    const duplicatedCode = this.projects.some(
      project => project.id !== projectId && project.code.toLowerCase() === request.code.trim().toLowerCase(),
    );
    if (duplicatedCode) {
      throw new Error('A project with this code already exists.');
    }

    const owner = this.findPersonOrThrow(request.ownerId);
    if (owner.status !== 'ACTIVE') {
      throw new Error('Project owner must be ACTIVE.');
    }

    const updatedProject: Project = {
      ...this.projects[projectIndex],
      name: request.name.trim(),
      code: request.code.trim().toUpperCase(),
      owner: this.personSummary(owner),
      status: request.status,
    };

    this.projects[projectIndex] = updatedProject;
    this.syncProjectReferences(updatedProject);

    return updatedProject;
  }

  private deleteProject(projectId: string): void {
    const projectExists = this.projects.some(project => project.id === projectId);
    if (!projectExists) {
      throw new Error('Project not found.');
    }

    this.projects = this.projects.filter(project => project.id !== projectId);

    this.weeks = this.weeks.map(week => ({
      ...week,
      days: week.days.map(day => ({
        ...day,
        people: day.people.map(dayPerson => ({
          ...dayPerson,
          projects: dayPerson.projects.filter(item => item.project.id !== projectId),
        })),
      })),
    }));
  }

  private listWeeks(query?: QueryParams): WeeksPage {
    let items = this.weeks.map(this.weekSummary);
    const status = query?.['status'];
    const startDateFrom = query?.['startDateFrom'];
    const startDateTo = query?.['startDateTo'];
    const page = this.toNumber(query?.['page'], 0);
    const size = this.toNumber(query?.['size'], 20);

    if (typeof status === 'string' && (status === 'PLANNED' || status === 'COMPLETED')) {
      items = items.filter(week => week.status === status);
    }

    if (typeof startDateFrom === 'string' && startDateFrom.trim()) {
      items = items.filter(week => week.startDate >= startDateFrom);
    }

    if (typeof startDateTo === 'string' && startDateTo.trim()) {
      items = items.filter(week => week.startDate <= startDateTo);
    }

    items.sort((a, b) => b.startDate.localeCompare(a.startDate));

    return this.paginate(items, page, size);
  }

  private createWeek(request: WeekCreateRequest): Week {
    this.validateWeekRequest(request);

    const week: WeekPlanning = {
      id: this.createUuid(),
      startDate: request.startDate,
      endDate: request.endDate,
      status: 'PLANNED',
      days: this.buildWeekDays(request.startDate),
    };

    this.weeks = [week, ...this.weeks];

    return this.weekSummary(week);
  }

  private getWeek(weekId: string): Week {
    const week = this.findWeekOrThrow(weekId);
    return this.weekSummary(week);
  }

  private updateWeek(weekId: string, request: WeekUpdateRequest): Week {
    this.validateWeekRequest(request);

    const weekIndex = this.weeks.findIndex(week => week.id === weekId);
    if (weekIndex < 0) {
      throw new Error('Week not found.');
    }

    const nextStatus: WeekStatus = request.status;
    const existingDays = [...this.weeks[weekIndex].days];

    const updatedWeek: WeekPlanning = {
      ...this.weeks[weekIndex],
      startDate: request.startDate,
      endDate: request.endDate,
      status: nextStatus,
      days: this.reconcileWeekDays(existingDays, request.startDate),
    };

    this.weeks[weekIndex] = updatedWeek;

    return this.weekSummary(updatedWeek);
  }

  private deleteWeek(weekId: string): void {
    const weekExists = this.weeks.some(week => week.id === weekId);
    if (!weekExists) {
      throw new Error('Week not found.');
    }

    this.weeks = this.weeks.filter(week => week.id !== weekId);
  }

  private getWeekPlanning(weekId: string): WeekPlanning {
    return this.findWeekOrThrow(weekId);
  }

  private addPersonToDay(weekId: string, date: string, request: AddPersonToDayRequest): DayPerson {
    const week = this.findWeekOrThrow(weekId);
    this.ensureWeekEditable(week);

    const day = this.findDayOrThrow(week, date);
    const person = this.findPersonOrThrow(request.personId);
    if (person.status !== 'ACTIVE') {
      throw new Error('Only ACTIVE people can be assigned.');
    }

    const duplicated = day.people.some(item => item.person.id === request.personId);
    if (duplicated) {
      throw new Error('Person is already assigned to this day.');
    }

    const dayPerson: DayPerson = {
      person: this.personSummary(person),
      projects: [],
    };

    day.people.push(dayPerson);
    return dayPerson;
  }

  private removePersonFromDay(weekId: string, date: string, personId: string): void {
    const week = this.findWeekOrThrow(weekId);
    this.ensureWeekEditable(week);

    const day = this.findDayOrThrow(week, date);
    const personIndex = day.people.findIndex(item => item.person.id === personId);
    if (personIndex < 0) {
      throw new Error('Person assignment not found for selected day.');
    }

    day.people.splice(personIndex, 1);
  }

  private addProjectToPerson(
    weekId: string,
    date: string,
    personId: string,
    request: AddProjectToPersonRequest,
  ): DayPersonProject {
    const week = this.findWeekOrThrow(weekId);
    this.ensureWeekEditable(week);

    const day = this.findDayOrThrow(week, date);
    const dayPerson = this.findDayPersonOrThrow(day.people, personId);
    const project = this.findProjectOrThrow(request.projectId);

    if (project.status !== 'ACTIVE') {
      throw new Error('Only ACTIVE projects can be assigned.');
    }

    const duplicated = dayPerson.projects.some(item => item.project.id === request.projectId);
    if (duplicated) {
      throw new Error('Project is already assigned to this person on this day.');
    }

    const dayPersonProject: DayPersonProject = {
      project: this.projectSummary(project),
      tasks: [],
    };

    dayPerson.projects.push(dayPersonProject);
    return dayPersonProject;
  }

  private removeProjectFromPerson(weekId: string, date: string, personId: string, projectId: string): void {
    const week = this.findWeekOrThrow(weekId);
    this.ensureWeekEditable(week);

    const day = this.findDayOrThrow(week, date);
    const dayPerson = this.findDayPersonOrThrow(day.people, personId);
    const projectIndex = dayPerson.projects.findIndex(item => item.project.id === projectId);
    if (projectIndex < 0) {
      throw new Error('Project assignment not found for selected person/day.');
    }

    dayPerson.projects.splice(projectIndex, 1);
  }

  private addTaskToProject(
    weekId: string,
    date: string,
    personId: string,
    projectId: string,
    request: AddTaskRequest,
  ): Task {
    const week = this.findWeekOrThrow(weekId);
    this.ensureWeekEditable(week);

    const day = this.findDayOrThrow(week, date);
    const dayPerson = this.findDayPersonOrThrow(day.people, personId);
    const dayProject = this.findDayProjectOrThrow(dayPerson.projects, projectId);
    const description = request.description.trim();

    if (description.length < 1) {
      throw new Error('Task description is required.');
    }

    const task: Task = {
      id: this.createUuid(),
      description,
    };

    dayProject.tasks.push(task);
    return task;
  }

  private removeTaskFromProject(
    weekId: string,
    date: string,
    personId: string,
    projectId: string,
    taskId: string,
  ): void {
    const week = this.findWeekOrThrow(weekId);
    this.ensureWeekEditable(week);

    const day = this.findDayOrThrow(week, date);
    const dayPerson = this.findDayPersonOrThrow(day.people, personId);
    const dayProject = this.findDayProjectOrThrow(dayPerson.projects, projectId);
    const taskIndex = dayProject.tasks.findIndex(task => task.id === taskId);

    if (taskIndex < 0) {
      throw new Error('Task not found for selected project/person/day.');
    }

    dayProject.tasks.splice(taskIndex, 1);
  }

  private findPersonOrThrow(personId: string): Person {
    const person = this.people.find(item => item.id === personId);
    if (!person) {
      throw new Error('Person not found.');
    }
    return person;
  }

  private findProjectOrThrow(projectId: string): Project {
    const project = this.projects.find(item => item.id === projectId);
    if (!project) {
      throw new Error('Project not found.');
    }
    return project;
  }

  private findWeekOrThrow(weekId: string): WeekPlanning {
    const week = this.weeks.find(item => item.id === weekId);
    if (!week) {
      throw new Error('Week not found.');
    }
    return week;
  }

  private findDayOrThrow(week: WeekPlanning, date: string): { date: string; people: DayPerson[] } {
    const day = week.days.find(dayPlan => dayPlan.date === date);
    if (!day) {
      throw new Error('Day not found in selected week.');
    }
    return day;
  }

  private findDayPersonOrThrow(dayPeople: DayPerson[], personId: string): DayPerson {
    const dayPerson = dayPeople.find(item => item.person.id === personId);
    if (!dayPerson) {
      throw new Error('Person is not assigned to this day.');
    }
    return dayPerson;
  }

  private findDayProjectOrThrow(projects: DayPersonProject[], projectId: string): DayPersonProject {
    const dayProject = projects.find(item => item.project.id === projectId);
    if (!dayProject) {
      throw new Error('Project is not assigned to this person/day.');
    }
    return dayProject;
  }

  private validatePersonRequest(request: PersonCreateRequest | PersonUpdateRequest): void {
    if (!request.name.trim() || !request.email.trim() || !request.role.trim()) {
      throw new Error('Name, email and role are required.');
    }
    if (!request.email.includes('@')) {
      throw new Error('Email must be valid.');
    }
  }

  private validateProjectRequest(request: ProjectCreateRequest | ProjectUpdateRequest): void {
    if (!request.name.trim() || !request.code.trim() || !request.ownerId.trim()) {
      throw new Error('Name, code and owner are required.');
    }
  }

  private validateWeekRequest(request: WeekCreateRequest | WeekUpdateRequest): void {
    if (!request.startDate || !request.endDate) {
      throw new Error('Week start and end dates are required.');
    }
    if (request.endDate < request.startDate) {
      throw new Error('Week end date must be on or after the start date.');
    }
  }

  private ensureWeekEditable(week: WeekPlanning): void {
    if (week.status === 'COMPLETED') {
      throw new Error('Week is completed and planning actions are disabled.');
    }
  }

  private syncPersonReferences(person: Person): void {
    const personSummary = this.personSummary(person);

    this.projects = this.projects.map(project =>
      project.owner.id === person.id
        ? {
            ...project,
            owner: personSummary,
          }
        : project,
    );

    this.weeks = this.weeks.map(week => ({
      ...week,
      days: week.days.map(day => ({
        ...day,
        people: day.people.map(dayPerson =>
          dayPerson.person.id === person.id
            ? {
                ...dayPerson,
                person: personSummary,
              }
            : dayPerson,
        ),
      })),
    }));
  }

  private syncProjectReferences(project: Project): void {
    const projectSummary = this.projectSummary(project);

    this.weeks = this.weeks.map(week => ({
      ...week,
      days: week.days.map(day => ({
        ...day,
        people: day.people.map(dayPerson => ({
          ...dayPerson,
          projects: dayPerson.projects.map(dayProject =>
            dayProject.project.id === project.id
              ? {
                  ...dayProject,
                  project: projectSummary,
                }
              : dayProject,
          ),
        })),
      })),
    }));
  }

  private weekSummary = (week: Week): Week => ({
    id: week.id,
    startDate: week.startDate,
    endDate: week.endDate,
    status: week.status,
  });

  private personSummary(person: Person): PersonSummary {
    return {
      id: person.id,
      name: person.name,
    };
  }

  private projectSummary(project: Project): ProjectSummary {
    return {
      id: project.id,
      name: project.name,
      code: project.code,
    };
  }

  private paginate<T>(
    items: T[],
    page: number,
    size: number,
  ): { items: T[]; page: { page: number; size: number; totalElements: number; totalPages: number } } {
    const safePage = Math.max(0, page);
    const safeSize = Math.max(1, size);
    const totalElements = items.length;
    const totalPages = totalElements === 0 ? 0 : Math.ceil(totalElements / safeSize);
    const start = safePage * safeSize;
    const end = start + safeSize;

    return {
      items: items.slice(start, end),
      page: {
        page: safePage,
        size: safeSize,
        totalElements,
        totalPages,
      },
    };
  }

  private buildWeekDays(startDate: string): { date: string; people: DayPerson[] }[] {
    const baseDate = new Date(`${startDate}T00:00:00`);
    const days: { date: string; people: DayPerson[] }[] = [];

    for (let offset = 0; offset < 5; offset += 1) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + offset);
      days.push({
        date: date.toISOString().slice(0, 10),
        people: [],
      });
    }

    return days;
  }

  private reconcileWeekDays(
    existingDays: { date: string; people: DayPerson[] }[],
    startDate: string,
  ): { date: string; people: DayPerson[] }[] {
    const generatedDates = this.buildWeekDays(startDate).map(item => item.date);

    return generatedDates.map(date => {
      const existingDay = existingDays.find(day => day.date === date);
      return existingDay ?? { date, people: [] };
    });
  }

  private normalizePath(path: string): string {
    return path.replace(/\/+$/, '') || '/';
  }

  private toNumber(input: string | number | boolean | string[] | undefined, defaultValue: number): number {
    if (typeof input === 'number') {
      return Number.isFinite(input) ? input : defaultValue;
    }
    if (typeof input === 'string') {
      const parsed = Number(input);
      return Number.isFinite(parsed) ? parsed : defaultValue;
    }
    return defaultValue;
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }

  private createUuid(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    return '00000000-0000-4000-8000-000000000000'.replace(/[08]/g, character =>
      (Number(character) ^ (Math.random() * 16) >> (Number(character) / 4)).toString(16),
    );
  }

  private requireBody<T>(body: unknown): T {
    if (body === null || body === undefined) {
      throw new Error('Request body is required.');
    }
    return body as T;
  }
}
