import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  DuplicateWeekRequest,
  PagedWeeks,
  Week,
  WeekCreateRequest,
  WeeksQuery,
  WeekUpdateRequest,
} from '../../core/models/api.models';
import { buildHttpParams } from '../../core/utils/http.util';

@Injectable({ providedIn: 'root' })
export class WeeksService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiBaseUrl;

  listWeeks(query: WeeksQuery): Observable<PagedWeeks> {
    return this.http.get<PagedWeeks>(`${this.apiBaseUrl}/weeks`, {
      params: buildHttpParams({
        page: query.page,
        size: query.size,
        search: query.search,
        sort: query.sort,
        status: query.status,
        weekStartFrom: query.weekStartFrom,
        weekStartTo: query.weekStartTo,
      }),
    });
  }

  getWeek(weekId: string): Observable<Week> {
    return this.http.get<Week>(`${this.apiBaseUrl}/weeks/${weekId}`);
  }

  createWeek(payload: WeekCreateRequest): Observable<Week> {
    return this.http.post<Week>(`${this.apiBaseUrl}/weeks`, payload);
  }

  updateWeek(weekId: string, payload: WeekUpdateRequest): Observable<Week> {
    return this.http.put<Week>(`${this.apiBaseUrl}/weeks/${weekId}`, payload);
  }

  duplicateWeek(weekId: string, payload: DuplicateWeekRequest): Observable<Week> {
    return this.http.post<Week>(`${this.apiBaseUrl}/weeks/${weekId}/duplicates`, payload);
  }

  deleteWeek(weekId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/weeks/${weekId}`);
  }
}
