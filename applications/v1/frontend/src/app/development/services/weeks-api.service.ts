import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  DayPlan,
  DayPlansList,
  WeekCreateRequest,
  WeekDetail,
  WeekDuplicateRequest,
  WeeksPage,
  WeekUpdateRequest,
} from '../models/api-models';
import { API_BASE_PATH, apiPath } from './api-paths';

@Injectable({
  providedIn: 'root',
})
export class WeeksApiService {
  constructor(private readonly http: HttpClient) {}

  listWeeks(page = 0, size = 20): Observable<WeeksPage> {
    const path = apiPath.weeks();
    const params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this.http
      .get<WeeksPage>(this.toUrl(path), { params })
      .pipe(catchError(this.handleError('listWeeks')));
  }

  createWeek(payload: WeekCreateRequest): Observable<WeekDetail> {
    const path = apiPath.weeks();
    return this.http
      .post<WeekDetail>(this.toUrl(path), payload)
      .pipe(catchError(this.handleError('createWeek')));
  }

  getWeek(weekId: string): Observable<WeekDetail> {
    const path = apiPath.weekById(weekId);
    return this.http
      .get<WeekDetail>(this.toUrl(path))
      .pipe(catchError(this.handleError('getWeek')));
  }

  updateWeek(weekId: string, payload: WeekUpdateRequest): Observable<WeekDetail> {
    const path = apiPath.weekById(weekId);
    return this.http
      .put<WeekDetail>(this.toUrl(path), payload)
      .pipe(catchError(this.handleError('updateWeek')));
  }

  deleteWeek(weekId: string): Observable<void> {
    const path = apiPath.weekById(weekId);
    return this.http
      .delete<void>(this.toUrl(path))
      .pipe(catchError(this.handleError('deleteWeek')));
  }

  duplicateWeek(weekId: string, payload: WeekDuplicateRequest): Observable<WeekDetail> {
    const path = apiPath.weekDuplicate(weekId);
    return this.http
      .post<WeekDetail>(this.toUrl(path), payload)
      .pipe(catchError(this.handleError('duplicateWeek')));
  }

  listWeekDays(weekId: string): Observable<DayPlansList> {
    const path = apiPath.weekDays(weekId);
    return this.http
      .get<DayPlansList>(this.toUrl(path))
      .pipe(catchError(this.handleError('listWeekDays')));
  }

  getDayPlan(weekId: string, date: string): Observable<DayPlan> {
    const path = apiPath.dayPlan(weekId, date);
    return this.http
      .get<DayPlan>(this.toUrl(path))
      .pipe(catchError(this.handleError('getDayPlan')));
  }

  private toUrl(path: string): string {
    return `${API_BASE_PATH}${path}`;
  }

  private handleError(operation: string) {
    return (error: unknown): Observable<never> => {
      console.error(`[WeeksApiService] ${operation} failed`, error);
      return throwError(() => error);
    };
  }
}
