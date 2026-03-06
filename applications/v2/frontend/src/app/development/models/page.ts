export type SortDirection = 'ASC' | 'DESC';

export interface PageSort {
  property: string;
  direction: SortDirection;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  sort?: PageSort[];
}
