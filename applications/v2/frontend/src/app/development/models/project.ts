import { PageInfo } from './page';
import { PersonSummary } from './person';

export type ProjectStatus = 'ACTIVE' | 'INACTIVE';

export interface Project {
  id: string;
  name: string;
  code: string;
  owner: PersonSummary;
  status: ProjectStatus;
}

export interface ProjectSummary {
  id: string;
  name: string;
  code: string;
}

export interface ProjectCreateRequest {
  name: string;
  code: string;
  ownerId: string;
  status: ProjectStatus;
}

export interface ProjectUpdateRequest {
  name: string;
  code: string;
  ownerId: string;
  status: ProjectStatus;
}

export interface ProjectsPage {
  items: Project[];
  page: PageInfo;
}
