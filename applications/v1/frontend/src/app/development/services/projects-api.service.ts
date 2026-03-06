import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  Project,
  ProjectCreateRequest,
  ProjectsPage,
  ProjectUpdateRequest,
} from '../models/api-models';
import { API_BASE_PATH, apiPath } from './api-paths';

@Injectable({
  providedIn: 'root',
})
export class ProjectsApiService {
  constructor(private readonly http: HttpClient) {}

  listProjects(page = 0, size = 20): Observable<ProjectsPage> {
    const path = apiPath.projects();
    const params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this.http
      .get<ProjectsPage>(this.toUrl(path), { params })
      .pipe(catchError(this.handleError('listProjects')));
  }

  createProject(payload: ProjectCreateRequest): Observable<Project> {
    const path = apiPath.projects();
    return this.http
      .post<Project>(this.toUrl(path), payload)
      .pipe(catchError(this.handleError('createProject')));
  }

  getProject(projectId: string): Observable<Project> {
    const path = apiPath.projectById(projectId);
    return this.http
      .get<Project>(this.toUrl(path))
      .pipe(catchError(this.handleError('getProject')));
  }

  updateProject(projectId: string, payload: ProjectUpdateRequest): Observable<Project> {
    const path = apiPath.projectById(projectId);
    return this.http
      .put<Project>(this.toUrl(path), payload)
      .pipe(catchError(this.handleError('updateProject')));
  }

  deleteProject(projectId: string): Observable<void> {
    const path = apiPath.projectById(projectId);
    return this.http
      .delete<void>(this.toUrl(path))
      .pipe(catchError(this.handleError('deleteProject')));
  }

  private toUrl(path: string): string {
    return `${API_BASE_PATH}${path}`;
  }

  private handleError(operation: string) {
    return (error: unknown): Observable<never> => {
      console.error(`[ProjectsApiService] ${operation} failed`, error);
      return throwError(() => error);
    };
  }
}
