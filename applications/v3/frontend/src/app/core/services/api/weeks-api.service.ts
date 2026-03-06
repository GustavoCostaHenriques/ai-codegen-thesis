import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateWeekRequest,
  WeekDetail,
  WeekPage,
  WeekStatus,
  UpdateWeekRequest,
} from '../../models/api.models';
import { environment } from '../../../../environments/environment';
import { toHttpParams } from './http-params.util';

export interface ListWeeksQuery {
  page?: number;
  size?: number;
  sort?: string[];
  status?: WeekStatus;
  weekStartFrom?: string;
  weekStartTo?: string;
}

@Injectable({ providedIn: 'root' })
export class WeeksApiService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  listWeeks(query: ListWeeksQuery) {
    return this.http.get<WeekPage>(`${this.apiBaseUrl}/weeks`, {
      params: toHttpParams(query),
    });
  }

  getWeekById(weekId: string) {
    return this.http.get<WeekDetail>(`${this.apiBaseUrl}/weeks/${weekId}`);
  }

  createWeek(request: CreateWeekRequest) {
    return this.http.post<WeekDetail>(`${this.apiBaseUrl}/weeks`, request);
  }

  updateWeekById(weekId: string, request: UpdateWeekRequest) {
    return this.http.put<WeekDetail>(`${this.apiBaseUrl}/weeks/${weekId}`, request);
  }

  deleteWeekById(weekId: string) {
    return this.http.delete<void>(`${this.apiBaseUrl}/weeks/${weekId}`);
  }
}
