import { Injectable } from '@angular/core';
import {
  DayOfWeek,
  DayPlan,
  DayPlansList,
  DayUser,
  DayUserCreateRequest,
  DayUserProject,
  DayUserProjectAssignRequest,
  DayUserProjectsList,
  DayUsersList,
  PageMetadata,
  Project,
  ProjectCreateRequest,
  ProjectSummary,
  ProjectUpdateRequest,
  ProjectsPage,
  Task,
  TaskCreateRequest,
  TasksList,
  User,
  UserCreateRequest,
  UserSummary,
  UserUpdateRequest,
  UsersPage,
  WeekCreateRequest,
  WeekDetail,
  WeekDuplicateRequest,
  WeekSummary,
  WeeksPage,
  WeekUpdateRequest,
} from '../models/api-models';
import { API_PATHS } from './api-paths';

@Injectable({
  providedIn: 'root',
})
export class MockBackendService {
  readonly paths = API_PATHS;

  private readonly minTaskLength = 3;

  private readonly users: User[] = [
    {
      id: '11111111-1111-4111-8111-111111111111',
      name: 'Ana Costa',
      email: 'ana@company.com',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
    {
      id: '11111111-1111-4111-8111-111111111112',
      name: 'Bob Silva',
      email: 'bob@company.com',
      role: 'USER',
      status: 'ACTIVE',
    },
    {
      id: '11111111-1111-4111-8111-111111111113',
      name: 'Carla Lima',
      email: 'carla@company.com',
      role: 'USER',
      status: 'INACTIVE',
    },
    {
      id: '11111111-1111-4111-8111-111111111114',
      name: 'Diego Moreira',
      email: 'diego@company.com',
      role: 'USER',
      status: 'ACTIVE',
    },
    {
      id: '11111111-1111-4111-8111-111111111115',
      name: 'Elena Pires',
      email: 'elena@company.com',
      role: 'USER',
      status: 'ACTIVE',
    },
    {
      id: '11111111-1111-4111-8111-111111111116',
      name: 'Faisal Khan',
      email: 'faisal@company.com',
      role: 'USER',
      status: 'ACTIVE',
    },
    {
      id: '11111111-1111-4111-8111-111111111117',
      name: 'Gina Alves',
      email: 'gina@company.com',
      role: 'USER',
      status: 'ACTIVE',
    },
    {
      id: '11111111-1111-4111-8111-111111111118',
      name: 'Hugo Sousa',
      email: 'hugo@company.com',
      role: 'USER',
      status: 'ACTIVE',
    },
  ];

  private readonly projects: Project[] = [
    {
      id: '22222222-2222-4222-8222-222222222221',
      name: 'Apollo',
      code: 'AP-01',
      status: 'ACTIVE',
      owner: this.toUserSummary(this.users[0]),
    },
    {
      id: '22222222-2222-4222-8222-222222222222',
      name: 'Hermes',
      code: 'HM-02',
      status: 'ACTIVE',
      owner: this.toUserSummary(this.users[1]),
    },
    {
      id: '22222222-2222-4222-8222-222222222223',
      name: 'Atlas',
      code: 'AT-03',
      status: 'PAUSED',
      owner: this.toUserSummary(this.users[2]),
    },
    {
      id: '22222222-2222-4222-8222-222222222224',
      name: 'Orion',
      code: 'OR-04',
      status: 'ACTIVE',
      owner: this.toUserSummary(this.users[3]),
    },
    {
      id: '22222222-2222-4222-8222-222222222225',
      name: 'Vega',
      code: 'VG-05',
      status: 'ACTIVE',
      owner: this.toUserSummary(this.users[4]),
    },
    {
      id: '22222222-2222-4222-8222-222222222226',
      name: 'Nova',
      code: 'NV-06',
      status: 'ACTIVE',
      owner: this.toUserSummary(this.users[5]),
    },
    {
      id: '22222222-2222-4222-8222-222222222227',
      name: 'Luna',
      code: 'LN-07',
      status: 'ACTIVE',
      owner: this.toUserSummary(this.users[6]),
    },
    {
      id: '22222222-2222-4222-8222-222222222228',
      name: 'Sol',
      code: 'SL-08',
      status: 'ACTIVE',
      owner: this.toUserSummary(this.users[7]),
    },
  ];

  private readonly weeks: WeekDetail[] = [
    this.createSeedWeek('33333333-3333-4333-8333-333333333332', 'Week 02', '2026-01-05', '2026-01-11', 'DRAFT'),
    this.createSeedWeek('33333333-3333-4333-8333-333333333333', 'Week 03', '2026-01-12', '2026-01-18', 'PUBLISHED'),
    this.createSeedWeek('33333333-3333-4333-8333-333333333334', 'Week 04', '2026-01-19', '2026-01-25', 'LOCKED'),
  ];

  listUsers(page: number, size: number): UsersPage {
    const sorted = [...this.users].sort((a, b) => a.name.localeCompare(b.name));
    const { items, metadata } = this.paginate(sorted, page, size);

    return { items, page: metadata };
  }

  createUser(request: UserCreateRequest): User {
    this.assertEmailAvailable(request.email);

    const user: User = {
      id: this.createId(),
      name: request.name.trim(),
      email: request.email.trim().toLowerCase(),
      role: request.role,
      status: request.status ?? 'ACTIVE',
    };

    this.users.push(user);

    return this.clone(user);
  }

  getUser(userId: string): User {
    return this.clone(this.getUserReference(userId));
  }

  updateUser(userId: string, request: UserUpdateRequest): User {
    const user = this.getUserReference(userId);

    this.assertEmailAvailable(request.email, userId);

    user.name = request.name.trim();
    user.email = request.email.trim().toLowerCase();
    user.role = request.role;
    user.status = request.status ?? user.status;

    this.updateUserSummaryInPlanning(user);

    return this.clone(user);
  }

  deleteUser(userId: string): void {
    if (this.isUserUsedInPlanning(userId)) {
      throw new Error('Conflict: user is assigned to at least one day plan.');
    }

    const index = this.users.findIndex(user => user.id === userId);
    if (index < 0) {
      throw new Error('User not found.');
    }

    this.users.splice(index, 1);
  }

  listProjects(page: number, size: number): ProjectsPage {
    const sorted = [...this.projects].sort((a, b) => a.name.localeCompare(b.name));
    const { items, metadata } = this.paginate(sorted, page, size);

    return { items, page: metadata };
  }

  createProject(request: ProjectCreateRequest): Project {
    this.assertCodeAvailable(request.code);

    const project: Project = {
      id: this.createId(),
      name: request.name.trim(),
      code: request.code.trim().toUpperCase(),
      status: request.status ?? 'ACTIVE',
      owner: this.toUserSummary(this.users[0]),
    };

    this.projects.push(project);

    return this.clone(project);
  }

  getProject(projectId: string): Project {
    return this.clone(this.getProjectReference(projectId));
  }

  updateProject(projectId: string, request: ProjectUpdateRequest): Project {
    const project = this.getProjectReference(projectId);

    this.assertCodeAvailable(request.code, projectId);

    project.name = request.name.trim();
    project.code = request.code.trim().toUpperCase();
    project.status = request.status;

    this.updateProjectSummaryInPlanning(project);

    return this.clone(project);
  }

  deleteProject(projectId: string): void {
    if (this.isProjectUsedInPlanning(projectId)) {
      throw new Error('Conflict: project is assigned to at least one day user.');
    }

    const index = this.projects.findIndex(project => project.id === projectId);
    if (index < 0) {
      throw new Error('Project not found.');
    }

    this.projects.splice(index, 1);
  }

  listWeeks(page: number, size: number): WeeksPage {
    const sorted = [...this.weeks]
      .map(week => this.toWeekSummary(week))
      .sort((a, b) => a.startDate.localeCompare(b.startDate));

    const { items, metadata } = this.paginate(sorted, page, size);

    return { items, page: metadata };
  }

  createWeek(request: WeekCreateRequest): WeekDetail {
    this.assertWeekDates(request.startDate, request.endDate);

    const week: WeekDetail = {
      id: this.createId(),
      label: request.label.trim(),
      startDate: request.startDate,
      endDate: request.endDate,
      status: request.status ?? 'DRAFT',
      dayPlans: this.createDayPlans(request.startDate, request.endDate),
    };

    this.weeks.push(week);

    return this.clone(week);
  }

  getWeek(weekId: string): WeekDetail {
    return this.clone(this.getWeekReference(weekId));
  }

  updateWeek(weekId: string, request: WeekUpdateRequest): WeekDetail {
    this.assertWeekDates(request.startDate, request.endDate);

    const week = this.getWeekReference(weekId);

    week.label = request.label.trim();
    week.status = request.status ?? week.status;

    if (week.startDate !== request.startDate || week.endDate !== request.endDate) {
      week.startDate = request.startDate;
      week.endDate = request.endDate;
      week.dayPlans = this.createDayPlans(request.startDate, request.endDate);
    }

    return this.clone(week);
  }

  deleteWeek(weekId: string): void {
    const index = this.weeks.findIndex(week => week.id === weekId);
    if (index < 0) {
      throw new Error('Week not found.');
    }

    this.weeks.splice(index, 1);
  }

  duplicateWeek(weekId: string, request: WeekDuplicateRequest): WeekDetail {
    this.assertWeekDates(request.startDate, request.endDate);

    const sourceWeek = this.getWeekReference(weekId);
    const targetWeek: WeekDetail = {
      id: this.createId(),
      label: request.label.trim(),
      startDate: request.startDate,
      endDate: request.endDate,
      status: 'DRAFT',
      dayPlans: this.createDayPlans(request.startDate, request.endDate),
    };

    for (let index = 0; index < targetWeek.dayPlans.length; index += 1) {
      const sourceDay = sourceWeek.dayPlans[index];
      if (!sourceDay) {
        continue;
      }

      targetWeek.dayPlans[index].users = sourceDay.users.map(dayUser => ({
        user: this.clone(dayUser.user),
        projects: dayUser.projects.map(dayProject => ({
          project: this.clone(dayProject.project),
          tasks: dayProject.tasks.map(task => ({ id: this.createId(), text: task.text })),
        })),
      }));
    }

    this.weeks.push(targetWeek);

    return this.clone(targetWeek);
  }

  listWeekDays(weekId: string): DayPlansList {
    const week = this.getWeekReference(weekId);
    return { items: this.clone(week.dayPlans) };
  }

  getDayPlan(weekId: string, date: string): DayPlan {
    return this.clone(this.getDayPlanReference(weekId, date));
  }

  listDayUsers(weekId: string, date: string): DayUsersList {
    const dayPlan = this.getDayPlanReference(weekId, date);
    return { items: this.clone(dayPlan.users) };
  }

  addUserToDay(weekId: string, date: string, request: DayUserCreateRequest): DayUser {
    const dayPlan = this.getDayPlanReference(weekId, date);

    if (dayPlan.users.some(dayUser => dayUser.user.id === request.userId)) {
      throw new Error('Conflict: user is already assigned to this day.');
    }

    const user = this.getUserReference(request.userId);
    const dayUser: DayUser = {
      user: this.toUserSummary(user),
      projects: [],
    };

    dayPlan.users.push(dayUser);

    return this.clone(dayUser);
  }

  removeUserFromDay(weekId: string, date: string, userId: string): void {
    const dayPlan = this.getDayPlanReference(weekId, date);
    const index = dayPlan.users.findIndex(dayUser => dayUser.user.id === userId);

    if (index < 0) {
      throw new Error('Day user not found.');
    }

    dayPlan.users.splice(index, 1);
  }

  listDayUserProjects(weekId: string, date: string, userId: string): DayUserProjectsList {
    const dayUser = this.getDayUserReference(weekId, date, userId);

    return { items: this.clone(dayUser.projects) };
  }

  assignProjectToDayUser(
    weekId: string,
    date: string,
    userId: string,
    request: DayUserProjectAssignRequest,
  ): DayUserProject {
    const dayUser = this.getDayUserReference(weekId, date, userId);

    if (dayUser.projects.some(dayProject => dayProject.project.id === request.projectId)) {
      throw new Error('Conflict: project is already assigned to this user on this day.');
    }

    const project = this.getProjectReference(request.projectId);

    const dayProject: DayUserProject = {
      project: this.toProjectSummary(project),
      tasks: [],
    };

    dayUser.projects.push(dayProject);

    return this.clone(dayProject);
  }

  removeProjectFromDayUser(
    weekId: string,
    date: string,
    userId: string,
    projectId: string,
  ): void {
    const dayUser = this.getDayUserReference(weekId, date, userId);
    const index = dayUser.projects.findIndex(dayProject => dayProject.project.id === projectId);

    if (index < 0) {
      throw new Error('Day user project not found.');
    }

    dayUser.projects.splice(index, 1);
  }

  listTasks(weekId: string, date: string, userId: string, projectId: string): TasksList {
    const dayUserProject = this.getDayUserProjectReference(weekId, date, userId, projectId);

    return { items: this.clone(dayUserProject.tasks) };
  }

  addTask(
    weekId: string,
    date: string,
    userId: string,
    projectId: string,
    request: TaskCreateRequest,
  ): Task {
    if (request.text.trim().length < this.minTaskLength) {
      throw new Error(`Validation error: task must contain at least ${this.minTaskLength} characters.`);
    }

    const dayUserProject = this.getDayUserProjectReference(weekId, date, userId, projectId);

    const task: Task = {
      id: this.createId(),
      text: request.text.trim(),
    };

    dayUserProject.tasks.push(task);

    return this.clone(task);
  }

  removeTask(
    weekId: string,
    date: string,
    userId: string,
    projectId: string,
    taskId: string,
  ): void {
    const dayUserProject = this.getDayUserProjectReference(weekId, date, userId, projectId);

    const index = dayUserProject.tasks.findIndex(task => task.id === taskId);
    if (index < 0) {
      throw new Error('Task not found.');
    }

    dayUserProject.tasks.splice(index, 1);
  }

  private createSeedWeek(
    id: string,
    label: string,
    startDate: string,
    endDate: string,
    status: WeekSummary['status'],
  ): WeekDetail {
    const week: WeekDetail = {
      id,
      label,
      startDate,
      endDate,
      status,
      dayPlans: this.createDayPlans(startDate, endDate),
    };

    if (label !== 'Week 02') {
      return week;
    }

    this.assignSeedEntry(week, '2026-01-05', this.users[0].id, this.projects[0].id, ['API sync', 'Unit tests']);
    this.assignSeedEntry(week, '2026-01-05', this.users[1].id, this.projects[1].id, ['UI review']);
    this.assignSeedEntry(week, '2026-01-06', this.users[2].id, this.projects[2].id, ['DB schema']);
    this.assignSeedEntry(week, '2026-01-07', this.users[3].id, this.projects[3].id, ['Sprint plan']);
    this.assignSeedEntry(week, '2026-01-08', this.users[4].id, this.projects[4].id, ['Bug triage']);
    this.assignSeedEntry(week, '2026-01-09', this.users[5].id, this.projects[5].id, ['Release prep']);
    this.assignSeedEntry(week, '2026-01-10', this.users[6].id, this.projects[6].id, ['On-call']);
    this.assignSeedEntry(week, '2026-01-11', this.users[7].id, this.projects[7].id, ['Monitoring']);

    return week;
  }

  private assignSeedEntry(
    week: WeekDetail,
    date: string,
    userId: string,
    projectId: string,
    tasks: string[],
  ): void {
    const dayPlan = week.dayPlans.find(day => day.date === date);
    const user = this.getUserReference(userId);
    const project = this.getProjectReference(projectId);

    if (!dayPlan) {
      return;
    }

    dayPlan.users.push({
      user: this.toUserSummary(user),
      projects: [
        {
          project: this.toProjectSummary(project),
          tasks: tasks.map(text => ({ id: this.createId(), text })),
        },
      ],
    });
  }

  private createDayPlans(startDate: string, endDate: string): DayPlan[] {
    const plans: DayPlan[] = [];

    let cursor = this.toDate(startDate);
    const end = this.toDate(endDate);

    while (cursor <= end) {
      const date = this.toIsoDate(cursor);
      plans.push({
        date,
        dayOfWeek: this.toDayOfWeek(cursor),
        users: [],
      });

      cursor = this.addDays(cursor, 1);
    }

    return plans;
  }

  private paginate<T>(items: T[], page: number, size: number): { items: T[]; metadata: PageMetadata } {
    const normalizedSize = size > 0 ? size : 20;
    const normalizedPage = page >= 0 ? page : 0;

    const start = normalizedPage * normalizedSize;
    const end = start + normalizedSize;

    return {
      items: this.clone(items.slice(start, end)),
      metadata: {
        page: normalizedPage,
        size: normalizedSize,
        totalElements: items.length,
        totalPages: Math.ceil(items.length / normalizedSize),
      },
    };
  }

  private getWeekReference(weekId: string): WeekDetail {
    const week = this.weeks.find(entry => entry.id === weekId);
    if (!week) {
      throw new Error('Week not found.');
    }

    return week;
  }

  private getDayPlanReference(weekId: string, date: string): DayPlan {
    const week = this.getWeekReference(weekId);
    const dayPlan = week.dayPlans.find(day => day.date === date);

    if (!dayPlan) {
      throw new Error('Day plan not found.');
    }

    return dayPlan;
  }

  private getDayUserReference(weekId: string, date: string, userId: string): DayUser {
    const dayPlan = this.getDayPlanReference(weekId, date);
    const dayUser = dayPlan.users.find(entry => entry.user.id === userId);

    if (!dayUser) {
      throw new Error('Day user not found.');
    }

    return dayUser;
  }

  private getDayUserProjectReference(
    weekId: string,
    date: string,
    userId: string,
    projectId: string,
  ): DayUserProject {
    const dayUser = this.getDayUserReference(weekId, date, userId);
    const dayUserProject = dayUser.projects.find(entry => entry.project.id === projectId);

    if (!dayUserProject) {
      throw new Error('Day user project not found.');
    }

    return dayUserProject;
  }

  private getUserReference(userId: string): User {
    const user = this.users.find(entry => entry.id === userId);
    if (!user) {
      throw new Error('User not found.');
    }

    return user;
  }

  private getProjectReference(projectId: string): Project {
    const project = this.projects.find(entry => entry.id === projectId);
    if (!project) {
      throw new Error('Project not found.');
    }

    return project;
  }

  private assertWeekDates(startDate: string, endDate: string): void {
    if (this.toDate(startDate) > this.toDate(endDate)) {
      throw new Error('Validation error: endDate must be equal to or greater than startDate.');
    }
  }

  private assertEmailAvailable(email: string, ignoredUserId?: string): void {
    const normalized = email.trim().toLowerCase();
    const inUse = this.users.some(
      user => user.id !== ignoredUserId && user.email.toLowerCase() === normalized,
    );

    if (inUse) {
      throw new Error('Conflict: this email is already registered.');
    }
  }

  private assertCodeAvailable(code: string, ignoredProjectId?: string): void {
    const normalized = code.trim().toUpperCase();
    const inUse = this.projects.some(
      project => project.id !== ignoredProjectId && project.code.toUpperCase() === normalized,
    );

    if (inUse) {
      throw new Error('Conflict: this project code already exists.');
    }
  }

  private isUserUsedInPlanning(userId: string): boolean {
    return this.weeks.some(week =>
      week.dayPlans.some(day => day.users.some(dayUser => dayUser.user.id === userId)),
    );
  }

  private isProjectUsedInPlanning(projectId: string): boolean {
    return this.weeks.some(week =>
      week.dayPlans.some(day =>
        day.users.some(dayUser =>
          dayUser.projects.some(dayProject => dayProject.project.id === projectId),
        ),
      ),
    );
  }

  private updateUserSummaryInPlanning(user: User): void {
    for (const week of this.weeks) {
      for (const day of week.dayPlans) {
        for (const dayUser of day.users) {
          if (dayUser.user.id !== user.id) {
            continue;
          }

          dayUser.user = this.toUserSummary(user);
        }
      }
    }
  }

  private updateProjectSummaryInPlanning(project: Project): void {
    for (const week of this.weeks) {
      for (const day of week.dayPlans) {
        for (const dayUser of day.users) {
          for (const dayProject of dayUser.projects) {
            if (dayProject.project.id !== project.id) {
              continue;
            }

            dayProject.project = this.toProjectSummary(project);
          }
        }
      }
    }
  }

  private toWeekSummary(week: WeekDetail): WeekSummary {
    return {
      id: week.id,
      label: week.label,
      startDate: week.startDate,
      endDate: week.endDate,
      status: week.status,
    };
  }

  private toUserSummary(user: User): UserSummary {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  private toProjectSummary(project: Project): ProjectSummary {
    return {
      id: project.id,
      name: project.name,
      code: project.code,
      status: project.status,
    };
  }

  private toDate(date: string): Date {
    return new Date(`${date}T00:00:00Z`);
  }

  private addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }

  private toIsoDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  private toDayOfWeek(date: Date): DayOfWeek {
    const weekdays: DayOfWeek[] = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ];

    return weekdays[date.getUTCDay()];
  }

  private createId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, token => {
      const value = Math.floor(Math.random() * 16);
      const normalized = token === 'x' ? value : (value & 0x3) | 0x8;
      return normalized.toString(16);
    });
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }
}
