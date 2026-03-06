import { PageInfo } from './page';

export type WeekStatus = 'PLANNED' | 'COMPLETED';

export interface Week {
  id: string;
  startDate: string;
  endDate: string;
  status: WeekStatus;
}

export interface WeekCreateRequest {
  startDate: string;
  endDate: string;
  status: WeekStatus;
}

export interface WeekUpdateRequest {
  startDate: string;
  endDate: string;
  status: WeekStatus;
}

export interface WeeksPage {
  items: Week[];
  page: PageInfo;
}
