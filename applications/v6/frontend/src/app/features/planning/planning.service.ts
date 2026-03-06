import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AssignmentCreateRequest,
  AssignmentUpdateRequest,
  DayProject,
  PlanningAssignment,
  Task,
  TaskCreateRequest,
  TaskUpdateRequest,
  WeekPlanningBoard,
} from '../../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class PlanningService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiBaseUrl;

  getPlanningBoard(weekId: string): Observable<WeekPlanningBoard> {
    return this.http.get<WeekPlanningBoard>(`${this.apiBaseUrl}/weeks/${weekId}/planning-board`);
  }

  ensureProjectOnDay(weekId: string, dayPlanId: string, projectId: string): Observable<DayProject> {
    return this.http.put<DayProject>(`${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}`, {});
  }

  deleteDayProject(weekId: string, dayPlanId: string, projectId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}`);
  }

  createAssignment(
    weekId: string,
    dayPlanId: string,
    projectId: string,
    payload: AssignmentCreateRequest,
  ): Observable<PlanningAssignment> {
    return this.http.post<PlanningAssignment>(
      `${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}/assignments`,
      payload,
    );
  }

  updateAssignment(
    weekId: string,
    dayPlanId: string,
    projectId: string,
    assignmentId: string,
    payload: AssignmentUpdateRequest,
  ): Observable<PlanningAssignment> {
    return this.http.put<PlanningAssignment>(
      `${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}/assignments/${assignmentId}`,
      payload,
    );
  }

  deleteAssignment(weekId: string, dayPlanId: string, projectId: string, assignmentId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}/assignments/${assignmentId}`,
    );
  }

  createTask(
    weekId: string,
    dayPlanId: string,
    projectId: string,
    assignmentId: string,
    payload: TaskCreateRequest,
  ): Observable<Task> {
    return this.http.post<Task>(
      `${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}/assignments/${assignmentId}/tasks`,
      payload,
    );
  }

  updateTask(
    weekId: string,
    dayPlanId: string,
    projectId: string,
    assignmentId: string,
    taskId: string,
    payload: TaskUpdateRequest,
  ): Observable<Task> {
    return this.http.put<Task>(
      `${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}/assignments/${assignmentId}/tasks/${taskId}`,
      payload,
    );
  }

  deleteTask(
    weekId: string,
    dayPlanId: string,
    projectId: string,
    assignmentId: string,
    taskId: string,
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiBaseUrl}/weeks/${weekId}/day-plans/${dayPlanId}/projects/${projectId}/assignments/${assignmentId}/tasks/${taskId}`,
    );
  }
}
