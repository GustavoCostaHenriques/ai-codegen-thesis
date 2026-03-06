import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AddPersonToDayRequest,
  AddProjectToDayPersonRequest,
  AddTaskRequest,
  DayPlan,
  DayPlanCollection,
  DayPerson,
  DayPersonProject,
  Task,
  WeekPlanningBoard,
} from '../../models/api.models';
import { environment } from '../../../../environments/environment';
import { toHttpParams } from './http-params.util';

@Injectable({ providedIn: 'root' })
export class PlanningApiService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  getWeekPlanningBoard(weekId: string, personId?: string, includeEmptyDays: boolean = true) {
    return this.http.get<WeekPlanningBoard>(`${this.apiBaseUrl}/weeks/${weekId}/planning`, {
      params: toHttpParams({ personId, includeEmptyDays }),
    });
  }

  listWeekDayPlans(weekId: string, includeAssignments: boolean = true) {
    return this.http.get<DayPlanCollection>(`${this.apiBaseUrl}/weeks/${weekId}/day-plans`, {
      params: toHttpParams({ includeAssignments }),
    });
  }

  getWeekDayPlanById(weekId: string, dayPlanId: string) {
    return this.http.get<DayPlan>(`${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}`);
  }

  addPersonToDayPlan(weekId: string, dayPlanId: string, request: AddPersonToDayRequest) {
    return this.http.post<DayPerson>(
      `${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/day-persons`,
      request,
    );
  }

  removePersonFromDayPlan(weekId: string, dayPlanId: string, dayPersonId: string) {
    return this.http.delete<void>(
      `${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/day-persons/${dayPersonId}`,
    );
  }

  addProjectToDayPerson(
    weekId: string,
    dayPlanId: string,
    dayPersonId: string,
    request: AddProjectToDayPersonRequest,
  ) {
    return this.http.post<DayPersonProject>(
      `${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/day-persons/${dayPersonId}/day-person-projects`,
      request,
    );
  }

  removeProjectFromDayPerson(
    weekId: string,
    dayPlanId: string,
    dayPersonId: string,
    dayPersonProjectId: string,
  ) {
    return this.http.delete<void>(
      `${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/day-persons/${dayPersonId}/day-person-projects/${dayPersonProjectId}`,
    );
  }

  addTaskToDayPersonProject(
    weekId: string,
    dayPlanId: string,
    dayPersonId: string,
    dayPersonProjectId: string,
    request: AddTaskRequest,
  ) {
    return this.http.post<Task>(
      `${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/day-persons/${dayPersonId}/day-person-projects/${dayPersonProjectId}/tasks`,
      request,
    );
  }

  removeTaskFromDayPersonProject(
    weekId: string,
    dayPlanId: string,
    dayPersonId: string,
    dayPersonProjectId: string,
    taskId: string,
  ) {
    return this.http.delete<void>(
      `${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/day-persons/${dayPersonId}/day-person-projects/${dayPersonProjectId}/tasks/${taskId}`,
    );
  }
}
