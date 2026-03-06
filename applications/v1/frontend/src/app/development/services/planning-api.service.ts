import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  DayUser,
  DayUserCreateRequest,
  DayUserProject,
  DayUserProjectAssignRequest,
  DayUserProjectsList,
  DayUsersList,
  Task,
  TaskCreateRequest,
  TasksList,
} from '../models/api-models';
import { API_BASE_PATH, apiPath } from './api-paths';

@Injectable({
  providedIn: 'root',
})
export class PlanningApiService {
  constructor(private readonly http: HttpClient) {}

  listDayUsers(weekId: string, date: string): Observable<DayUsersList> {
    const path = apiPath.dayUsers(weekId, date);
    return this.http
      .get<DayUsersList>(this.toUrl(path))
      .pipe(catchError(this.handleError('listDayUsers')));
  }

  addUserToDay(
    weekId: string,
    date: string,
    payload: DayUserCreateRequest,
  ): Observable<DayUser> {
    const path = apiPath.dayUsers(weekId, date);
    return this.http
      .post<DayUser>(this.toUrl(path), payload)
      .pipe(catchError(this.handleError('addUserToDay')));
  }

  removeUserFromDay(weekId: string, date: string, userId: string): Observable<void> {
    const path = apiPath.dayUserById(weekId, date, userId);
    return this.http
      .delete<void>(this.toUrl(path))
      .pipe(catchError(this.handleError('removeUserFromDay')));
  }

  listDayUserProjects(
    weekId: string,
    date: string,
    userId: string,
  ): Observable<DayUserProjectsList> {
    const path = apiPath.dayUserProjects(weekId, date, userId);
    return this.http
      .get<DayUserProjectsList>(this.toUrl(path))
      .pipe(catchError(this.handleError('listDayUserProjects')));
  }

  assignProjectToDayUser(
    weekId: string,
    date: string,
    userId: string,
    payload: DayUserProjectAssignRequest,
  ): Observable<DayUserProject> {
    const path = apiPath.dayUserProjects(weekId, date, userId);
    return this.http
      .post<DayUserProject>(this.toUrl(path), payload)
      .pipe(catchError(this.handleError('assignProjectToDayUser')));
  }

  removeProjectFromDayUser(
    weekId: string,
    date: string,
    userId: string,
    projectId: string,
  ): Observable<void> {
    const path = apiPath.dayUserProjectById(weekId, date, userId, projectId);
    return this.http
      .delete<void>(this.toUrl(path))
      .pipe(catchError(this.handleError('removeProjectFromDayUser')));
  }

  listTasks(
    weekId: string,
    date: string,
    userId: string,
    projectId: string,
  ): Observable<TasksList> {
    const path = apiPath.tasks(weekId, date, userId, projectId);
    return this.http
      .get<TasksList>(this.toUrl(path))
      .pipe(catchError(this.handleError('listTasks')));
  }

  addTask(
    weekId: string,
    date: string,
    userId: string,
    projectId: string,
    payload: TaskCreateRequest,
  ): Observable<Task> {
    const path = apiPath.tasks(weekId, date, userId, projectId);
    return this.http
      .post<Task>(this.toUrl(path), payload)
      .pipe(catchError(this.handleError('addTask')));
  }

  removeTask(
    weekId: string,
    date: string,
    userId: string,
    projectId: string,
    taskId: string,
  ): Observable<void> {
    const path = apiPath.taskById(weekId, date, userId, projectId, taskId);
    return this.http
      .delete<void>(this.toUrl(path))
      .pipe(catchError(this.handleError('removeTask')));
  }

  private toUrl(path: string): string {
    return `${API_BASE_PATH}${path}`;
  }

  private handleError(operation: string) {
    return (error: unknown): Observable<never> => {
      console.error(`[PlanningApiService] ${operation} failed`, error);
      return throwError(() => error);
    };
  }
}
