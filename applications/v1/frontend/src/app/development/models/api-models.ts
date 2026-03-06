export type UserRole = 'ADMIN' | 'USER';
export type UserStatus = 'ACTIVE' | 'INACTIVE';
export type ProjectStatus = 'ACTIVE' | 'PAUSED' | 'INACTIVE';
export type WeekStatus = 'DRAFT' | 'PUBLISHED' | 'LOCKED';
export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  status: ProjectStatus;
  owner?: UserSummary;
}

export interface ProjectSummary {
  id: string;
  name: string;
  code: string;
  status: ProjectStatus;
}

export interface Task {
  id: string;
  text: string;
}

export interface DayUserProject {
  project: ProjectSummary;
  tasks: Task[];
}

export interface DayUser {
  user: UserSummary;
  projects: DayUserProject[];
}

export interface DayPlan {
  date: string;
  dayOfWeek: DayOfWeek;
  users: DayUser[];
}

export interface WeekSummary {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  status: WeekStatus;
}

export interface WeekDetail extends WeekSummary {
  dayPlans: DayPlan[];
}

export interface PageMetadata {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface UsersPage {
  items: User[];
  page: PageMetadata;
}

export interface ProjectsPage {
  items: Project[];
  page: PageMetadata;
}

export interface WeeksPage {
  items: WeekSummary[];
  page: PageMetadata;
}

export interface DayPlansList {
  items: DayPlan[];
}

export interface DayUsersList {
  items: DayUser[];
}

export interface DayUserProjectsList {
  items: DayUserProject[];
}

export interface TasksList {
  items: Task[];
}

export interface UserCreateRequest {
  name: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
}

export interface UserUpdateRequest {
  name: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
}

export interface ProjectCreateRequest {
  name: string;
  code: string;
  status?: ProjectStatus;
}

export interface ProjectUpdateRequest {
  name: string;
  code: string;
  status: ProjectStatus;
}

export interface WeekCreateRequest {
  label: string;
  startDate: string;
  endDate: string;
  status?: WeekStatus;
}

export interface WeekUpdateRequest {
  label: string;
  startDate: string;
  endDate: string;
  status?: WeekStatus;
}

export interface WeekDuplicateRequest {
  label: string;
  startDate: string;
  endDate: string;
}

export interface DayUserCreateRequest {
  userId: string;
}

export interface DayUserProjectAssignRequest {
  projectId: string;
}

export interface TaskCreateRequest {
  text: string;
}

export interface ErrorDetail {
  field?: string;
  message: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
  details?: ErrorDetail[];
}
