export type AccountRole = 'ADMIN' | 'VIEWER';
export type PersonStatus = 'ACTIVE' | 'INACTIVE';
export type ProjectStatus = 'ACTIVE' | 'INACTIVE';
export type WeekStatus = 'PLANNED' | 'COMPLETED';
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';
export type SessionTokenType = 'Bearer';

export interface SessionCreateRequest {
  username: string;
  password: string;
}

export interface AuthenticatedUser {
  accountId: string;
  personId: string;
  name: string;
  username: string;
  email: string;
  role: AccountRole;
  status: PersonStatus;
}

export interface Session {
  accessToken: string;
  tokenType: SessionTokenType;
  expiresIn: number;
  user: AuthenticatedUser;
}

export interface PasswordChangeRequest {
  username: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface PersonCreateRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  role: AccountRole;
  status: PersonStatus;
}

export interface PersonUpdateRequest {
  name: string;
  username: string;
  email: string;
  password?: string;
  role: AccountRole;
  status: PersonStatus;
}

export interface PersonSummary {
  id: string;
  name: string;
  email: string;
  role: AccountRole;
  status: PersonStatus;
}

export interface Person {
  id: string;
  accountId: string;
  name: string;
  username: string;
  email: string;
  role: AccountRole;
  status: PersonStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCreateRequest {
  name: string;
  code: string;
  status: ProjectStatus;
}

export interface ProjectUpdateRequest {
  name: string;
  code: string;
  status: ProjectStatus;
}

export interface ProjectSummary {
  id: string;
  name: string;
  code: string;
  status: ProjectStatus;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface WeekCreateRequest {
  weekStart: string;
  weekEnd: string;
  status?: WeekStatus;
}

export interface WeekUpdateRequest {
  weekStart: string;
  weekEnd: string;
  status: WeekStatus;
}

export interface DuplicateWeekRequest {
  weekStart: string;
  weekEnd: string;
  status?: WeekStatus;
}

export interface WeekSummary {
  id: string;
  code: string;
  weekStart: string;
  weekEnd: string;
  status: WeekStatus;
}

export interface Week {
  id: string;
  code: string;
  weekStart: string;
  weekEnd: string;
  status: WeekStatus;
  createdAt: string;
  updatedAt: string;
}

export interface WeekPlanningBoard {
  week: WeekSummary;
  readOnly: boolean;
  dayPlans: DayPlan[];
}

export interface DayPlan {
  id: string;
  dayOfWeek: DayOfWeek;
  date: string;
  projects: DayProject[];
}

export interface DayProject {
  id: string;
  project: ProjectSummary;
  assignments: PlanningAssignment[];
}

export interface PlanningAssignment {
  id: string;
  person: PersonSummary;
  estimatedHours: number;
  actualHours: number | null;
  tasks: Task[];
}

export interface AssignmentCreateRequest {
  personId: string;
  estimatedHours: number;
  actualHours?: number | null;
  taskDescription: string;
}

export interface AssignmentUpdateRequest {
  estimatedHours: number;
  actualHours?: number | null;
}

export interface Task {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskCreateRequest {
  description: string;
}

export interface TaskUpdateRequest {
  description: string;
}

export interface PageMetadata {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  sort?: string[];
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export interface PagedPeople {
  content: PersonSummary[];
  page: PageMetadata;
}

export interface PagedProjects {
  content: ProjectSummary[];
  page: PageMetadata;
}

export interface PagedWeeks {
  content: WeekSummary[];
  page: PageMetadata;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  code?: string;
  message: string;
  path: string;
  details?: string[];
}

export interface FieldError {
  field: string;
  message: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
  fieldErrors: FieldError[];
}

export interface PageQuery {
  page: number;
  size: number;
  search?: string;
  sort?: string[];
}

export interface PeopleQuery extends PageQuery {
  status?: PersonStatus | '';
  role?: AccountRole | '';
}

export interface ProjectsQuery extends PageQuery {
  status?: ProjectStatus | '';
}

export interface WeeksQuery extends PageQuery {
  status?: WeekStatus | '';
  weekStartFrom?: string;
  weekStartTo?: string;
}
