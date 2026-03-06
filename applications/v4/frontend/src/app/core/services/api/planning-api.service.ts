import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddPersonToDayRequest,
  AddProjectToDayPersonRequest,
  AddTaskRequest,
  DayPerson,
  DayPersonProject,
  DayPlan,
  DayPlanCollection,
  GetWeekPlanningBoardQuery,
  ListWeekDayPlansQuery,
  Task,
  WeekPlanningBoard
} from '../../models/api.models';
import { ApiUrlService } from '../api-url.service';
import { buildHttpParams } from '../http-query.util';

@Injectable({ providedIn: 'root' })
export class PlanningApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly apiUrl: ApiUrlService
  ) {}

  getWeekPlanningBoard(weekId: string, query: GetWeekPlanningBoardQuery): Observable<WeekPlanningBoard> {
    return this.http.get<WeekPlanningBoard>(this.apiUrl.path(`/weeks/${weekId}/planning`), {
      params: buildHttpParams(query)
    });
  }

  listWeekDayPlans(weekId: string, query: ListWeekDayPlansQuery): Observable<DayPlanCollection> {
    return this.http.get<DayPlanCollection>(this.apiUrl.path(`/weeks/${weekId}/day-plans`), {
      params: buildHttpParams(query)
    });
  }

  getWeekDayPlanById(weekId: string, dayPlanId: string): Observable<DayPlan> {
    return this.http.get<DayPlan>(this.apiUrl.path(`/weeks/${weekId}/day-plans/${dayPlanId}`));
  }

  addPersonToDayPlan(weekId: string, dayPlanId: string, payload: AddPersonToDayRequest): Observable<DayPerson> {
    return this.http.post<DayPerson>(
      this.apiUrl.path(`/weeks/${weekId}/day-plans/${dayPlanId}/day-persons`),
      payload
    );
  }

  removePersonFromDayPlan(weekId: string, dayPlanId: string, dayPersonId: string): Observable<void> {
    return this.http.delete<void>(
      this.apiUrl.path(`/weeks/${weekId}/day-plans/${dayPlanId}/day-persons/${dayPersonId}`)
    );
  }

  addProjectToDayPerson(
    weekId: string,
    dayPlanId: string,
    dayPersonId: string,
    payload: AddProjectToDayPersonRequest
  ): Observable<DayPersonProject> {
    return this.http.post<DayPersonProject>(
      this.apiUrl.path(
        `/weeks/${weekId}/day-plans/${dayPlanId}/day-persons/${dayPersonId}/day-person-projects`
      ),
      payload
    );
  }

  removeProjectFromDayPerson(
    weekId: string,
    dayPlanId: string,
    dayPersonId: string,
    dayPersonProjectId: string
  ): Observable<void> {
    return this.http.delete<void>(
      this.apiUrl.path(
        `/weeks/${weekId}/day-plans/${dayPlanId}/day-persons/${dayPersonId}/day-person-projects/${dayPersonProjectId}`
      )
    );
  }

  addTaskToDayPersonProject(
    weekId: string,
    dayPlanId: string,
    dayPersonId: string,
    dayPersonProjectId: string,
    payload: AddTaskRequest
  ): Observable<Task> {
    return this.http.post<Task>(
      this.apiUrl.path(
        `/weeks/${weekId}/day-plans/${dayPlanId}/day-persons/${dayPersonId}/day-person-projects/${dayPersonProjectId}/tasks`
      ),
      payload
    );
  }

  removeTaskFromDayPersonProject(
    weekId: string,
    dayPlanId: string,
    dayPersonId: string,
    dayPersonProjectId: string,
    taskId: string
  ): Observable<void> {
    return this.http.delete<void>(
      this.apiUrl.path(
        `/weeks/${weekId}/day-plans/${dayPlanId}/day-persons/${dayPersonId}/day-person-projects/${dayPersonProjectId}/tasks/${taskId}`
      )
    );
  }
}
