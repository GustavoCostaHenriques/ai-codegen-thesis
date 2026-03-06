export type AccountRole = 'ADMIN' | 'VIEWER';
export type PersonStatus = 'ACTIVE' | 'INACTIVE';
export type ProjectStatus = 'ACTIVE' | 'INACTIVE';
export type WeekStatus = 'PLANNED' | 'COMPLETED';
export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';
export type SortDirection = 'asc' | 'desc';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  account: AuthenticatedAccount;
}

export interface AuthenticatedAccount {
  accountId: string;
  personId: string;
  username: string;
  name: string;
  email: string;
  role: AccountRole;
  status: PersonStatus;
}

export interface AccountRegistrationRequest {
  name: string;
  username?: string;
  email: string;
  password: string;
}

export interface AccountRegistrationResponse {
  accountId: string;
  personId: string;
  username: string;
  name: string;
  email: string;
  role: AccountRole;
  status: PersonStatus;
  createdAt: string;
}

export interface PasswordChangeRequest {
  username: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface CreatePersonRequest {
  name: string;
  username?: string;
  email: string;
  password: string;
  role: AccountRole;
  status: PersonStatus;
}

export interface UpdatePersonRequest {
  name: string;
  username?: string;
  email: string;
  role: AccountRole;
  status: PersonStatus;
}

export interface PersonSummary {
  personId: string;
  accountId: string;
  username: string;
  name: string;
  email: string;
  role: AccountRole;
  status: PersonStatus;
}

export interface PersonDetail extends PersonSummary {
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  code: string;
  status: ProjectStatus;
}

export interface UpdateProjectRequest {
  name: string;
  code: string;
  status: ProjectStatus;
}

export interface ProjectSummary {
  projectId: string;
  name: string;
  code: string;
  status: ProjectStatus;
}

export interface ProjectDetail extends ProjectSummary {
  createdAt: string;
  updatedAt: string;
}

export interface CreateWeekRequest {
  weekStart: string;
  weekEnd: string;
  status?: WeekStatus;
}

export interface UpdateWeekRequest {
  weekStart: string;
  weekEnd: string;
  status: WeekStatus;
}

export interface WeekSummary {
  weekId: string;
  weekStart: string;
  weekEnd: string;
  status: WeekStatus;
}

export interface WeekDetail extends WeekSummary {
  createdAt: string;
  updatedAt: string;
}

export interface WeekPlanningBoard {
  week: WeekDetail;
  dayPlans: DayPlan[];
}

export interface DayPlanCollection {
  weekId: string;
  dayPlans: DayPlan[];
}

export interface DayPlan {
  dayPlanId: string;
  weekId: string;
  date: string;
  dayOfWeek: DayOfWeek;
  dayPersons: DayPerson[];
}

export interface DayPerson {
  dayPersonId: string;
  person: PersonReference;
  dayPersonProjects: DayPersonProject[];
}

export interface DayPersonProject {
  dayPersonProjectId: string;
  project: ProjectReference;
  tasks: Task[];
}

export interface Task {
  taskId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PersonReference {
  personId: string;
  name: string;
  email: string;
  status: PersonStatus;
}

export interface ProjectReference {
  projectId: string;
  name: string;
  code: string;
  status: ProjectStatus;
}

export interface AddPersonToDayRequest {
  personId: string;
}

export interface AddProjectToDayPersonRequest {
  projectId: string;
}

export interface AddTaskRequest {
  description: string;
}

export interface SortOrder {
  property: string;
  direction: SortDirection;
}

export interface PageMetadata {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  sort?: SortOrder[];
}

export interface PersonPage {
  content: PersonSummary[];
  page: PageMetadata;
}

export interface ProjectPage {
  content: ProjectSummary[];
  page: PageMetadata;
}

export interface WeekPage {
  content: WeekSummary[];
  page: PageMetadata;
}

export interface FieldError {
  field: string;
  message: string;
  rejectedValue?: string | null;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  code: string;
  message: string;
  path: string;
  fieldErrors?: FieldError[];
}
