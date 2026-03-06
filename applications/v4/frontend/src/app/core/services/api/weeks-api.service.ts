import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateWeekRequest,
  ListWeeksQuery,
  UpdateWeekRequest,
  WeekDetail,
  WeekPage
} from '../../models/api.models';
import { ApiUrlService } from '../api-url.service';
import { buildHttpParams } from '../http-query.util';

@Injectable({ providedIn: 'root' })
export class WeeksApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly apiUrl: ApiUrlService
  ) {}

  listWeeks(query: ListWeeksQuery): Observable<WeekPage> {
    return this.http.get<WeekPage>(this.apiUrl.path('/weeks'), {
      params: buildHttpParams(query)
    });
  }

  createWeek(payload: CreateWeekRequest): Observable<WeekDetail> {
    return this.http.post<WeekDetail>(this.apiUrl.path('/weeks'), payload);
  }

  getWeekById(weekId: string): Observable<WeekDetail> {
    return this.http.get<WeekDetail>(this.apiUrl.path(`/weeks/${weekId}`));
  }

  updateWeekById(weekId: string, payload: UpdateWeekRequest): Observable<WeekDetail> {
    return this.http.put<WeekDetail>(this.apiUrl.path(`/weeks/${weekId}`), payload);
  }

  deleteWeekById(weekId: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl.path(`/weeks/${weekId}`));
  }
}
