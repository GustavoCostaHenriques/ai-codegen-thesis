import { PageInfo } from './page';

export type PersonStatus = 'ACTIVE' | 'INACTIVE';

export interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  status: PersonStatus;
}

export interface PersonSummary {
  id: string;
  name: string;
}

export interface PersonCreateRequest {
  name: string;
  email: string;
  role: string;
  status: PersonStatus;
}

export interface PersonUpdateRequest {
  name: string;
  email: string;
  role: string;
  status: PersonStatus;
}

export interface PeoplePage {
  items: Person[];
  page: PageInfo;
}
