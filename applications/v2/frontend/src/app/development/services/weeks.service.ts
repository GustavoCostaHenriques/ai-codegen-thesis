import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeekPlanning } from '../models/planning';
import { WeeksQuery } from '../models/requests';
import { Week, WeekCreateRequest, WeeksPage, WeekUpdateRequest } from '../models/week';
import { API_PATHS } from './api-paths';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root',
})
export class WeeksService {
  constructor(private readonly apiHttp: ApiHttpService) {}

  listWeeks(query: WeeksQuery = {}): Observable<WeeksPage> {
    return this.apiHttp.request<WeeksPage>('GET', API_PATHS.weeks, undefined, query);
  }

  getWeek(weekId: string): Observable<Week> {
    return this.apiHttp.request<Week>('GET', API_PATHS.weekById(weekId));
  }

  createWeek(request: WeekCreateRequest): Observable<Week> {
    return this.apiHttp.request<Week>('POST', API_PATHS.weeks, request);
  }

  updateWeek(weekId: string, request: WeekUpdateRequest): Observable<Week> {
    return this.apiHttp.request<Week>('PUT', API_PATHS.weekById(weekId), request);
  }

  deleteWeek(weekId: string): Observable<void> {
    return this.apiHttp.request<void>('DELETE', API_PATHS.weekById(weekId));
  }

  getWeekPlanning(weekId: string): Observable<WeekPlanning> {
    return this.apiHttp.request<WeekPlanning>('GET', API_PATHS.weekPlanning(weekId));
  }
}
