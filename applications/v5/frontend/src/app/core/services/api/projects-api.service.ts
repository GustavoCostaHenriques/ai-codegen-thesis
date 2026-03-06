import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  PagedProjects,
  Project,
  ProjectCreateRequest,
  ProjectUpdateRequest,
} from '../../../shared/models/api.models';
import { ProjectsQuery } from '../../../shared/models/query.models';
import { buildHttpParams } from './http-query.util';

@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  listProjects(query: ProjectsQuery = {}): Observable<PagedProjects> {
    return this.http.get<PagedProjects>(`${this.baseUrl}/projects`, {
      params: buildHttpParams(query),
    });
  }

  createProject(payload: ProjectCreateRequest): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/projects`, payload);
  }

  getProjectById(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/projects/${projectId}`);
  }

  updateProject(
    projectId: string,
    payload: ProjectUpdateRequest
  ): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/projects/${projectId}`, payload);
  }

  deleteProject(projectId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/projects/${projectId}`);
  }
}
