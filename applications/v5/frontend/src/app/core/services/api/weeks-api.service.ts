import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  DuplicateWeekRequest,
  PagedWeeks,
  Week,
  WeekCreateRequest,
  WeekUpdateRequest,
} from '../../../shared/models/api.models';
import { WeeksQuery } from '../../../shared/models/query.models';
import { buildHttpParams } from './http-query.util';

@Injectable({ providedIn: 'root' })
export class WeeksApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  listWeeks(query: WeeksQuery = {}): Observable<PagedWeeks> {
    return this.http.get<PagedWeeks>(`${this.baseUrl}/weeks`, {
      params: buildHttpParams(query),
    });
  }

  createWeek(payload: WeekCreateRequest): Observable<Week> {
    return this.http.post<Week>(`${this.baseUrl}/weeks`, payload);
  }

  getWeekById(weekId: string): Observable<Week> {
    return this.http.get<Week>(`${this.baseUrl}/weeks/${weekId}`);
  }

  updateWeek(weekId: string, payload: WeekUpdateRequest): Observable<Week> {
    return this.http.put<Week>(`${this.baseUrl}/weeks/${weekId}`, payload);
  }

  deleteWeek(weekId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/weeks/${weekId}`);
  }

  createWeekDuplicate(
    weekId: string,
    payload: DuplicateWeekRequest
  ): Observable<Week> {
    return this.http.post<Week>(
      `${this.baseUrl}/weeks/${weekId}/duplicates`,
      payload
    );
  }
}
