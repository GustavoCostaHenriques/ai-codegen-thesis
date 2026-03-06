import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  AssignmentCreateRequest,
  AssignmentUpdateRequest,
  DayPlan,
  DayProject,
  PlanningAssignment,
  Task,
  TaskCreateRequest,
  TaskUpdateRequest,
  WeekPlanningBoard,
} from '../../../shared/models/api.models';

@Injectable({ providedIn: 'root' })
export class PlanningApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  getWeekPlanningBoard(weekId: string): Observable<WeekPlanningBoard> {
    return this.http.get<WeekPlanningBoard>(
      `${this.baseUrl}/weeks/${weekId}/planning-board`
    );
  }

  listWeekDayPlans(weekId: string): Observable<DayPlan[]> {
    return this.http.get<DayPlan[]>(`${this.baseUrl}/weeks/${weekId}/day-plans`);
  }

  getDayPlanById(weekId: string, dayPlanId: string): Observable<DayPlan> {
    return this.http.get<DayPlan>(
      `${this.baseUrl}/weeks/${weekId}/day-plans/${dayPlanId}`
    );
  }

  upsertDayPlanProject(
    weekId: string,
    dayPlanId: string,
    projectId: string
  ): Observable<DayProject> {
    return this.http.put<DayProject>(
      `${this.baseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}`,
      {}
    );
  }

  deleteDayPlanProject(
    weekId: string,
    dayPlanId: string,
    projectId: string
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}`
    );
  }

  createPlanningAssignment(
    weekId: string,
    dayPlanId: string,
    projectId: string,
    payload: AssignmentCreateRequest
  ): Observable<PlanningAssignment> {
    return this.http.post<PlanningAssignment>(
      `${this.baseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}/assignments`,
      payload
    );
  }

  updatePlanningAssignment(
    weekId: string,
    dayPlanId: string,
    projectId: string,
    assignmentId: string,
    payload: AssignmentUpdateRequest
  ): Observable<PlanningAssignment> {
    return this.http.put<PlanningAssignment>(
      `${this.baseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}/assignments/${assignmentId}`,
      payload
    );
  }

  deletePlanningAssignment(
    weekId: string,
    dayPlanId: string,
    projectId: string,
    assignmentId: string
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}/assignments/${assignmentId}`
    );
  }

  createAssignmentTask(
    weekId: string,
    dayPlanId: string,
    projectId: string,
    assignmentId: string,
    payload: TaskCreateRequest
  ): Observable<Task> {
    return this.http.post<Task>(
      `${this.baseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}/assignments/${assignmentId}/tasks`,
      payload
    );
  }

  updateAssignmentTask(
    weekId: string,
    dayPlanId: string,
    projectId: string,
    assignmentId: string,
    taskId: string,
    payload: TaskUpdateRequest
  ): Observable<Task> {
    return this.http.put<Task>(
      `${this.baseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}/assignments/${assignmentId}/tasks/${taskId}`,
      payload
    );
  }

  deleteAssignmentTask(
    weekId: string,
    dayPlanId: string,
    projectId: string,
    assignmentId: string,
    taskId: string
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}/assignments/${assignmentId}/tasks/${taskId}`
    );
  }
}
