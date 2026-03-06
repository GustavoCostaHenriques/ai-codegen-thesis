import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateProjectRequest,
  ProjectDetail,
  ProjectPage,
  ProjectStatus,
  UpdateProjectRequest,
} from '../../models/api.models';
import { environment } from '../../../../environments/environment';
import { toHttpParams } from './http-params.util';

export interface ListProjectsQuery {
  page?: number;
  size?: number;
  sort?: string[];
  search?: string;
  status?: ProjectStatus;
}

@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  listProjects(query: ListProjectsQuery) {
    return this.http.get<ProjectPage>(`${this.apiBaseUrl}/projects`, {
      params: toHttpParams(query),
    });
  }

  getProjectById(projectId: string) {
    return this.http.get<ProjectDetail>(`${this.apiBaseUrl}/projects/${projectId}`);
  }

  createProject(request: CreateProjectRequest) {
    return this.http.post<ProjectDetail>(`${this.apiBaseUrl}/projects`, request);
  }

  updateProjectById(projectId: string, request: UpdateProjectRequest) {
    return this.http.put<ProjectDetail>(`${this.apiBaseUrl}/projects/${projectId}`, request);
  }

  deleteProjectById(projectId: string) {
    return this.http.delete<void>(`${this.apiBaseUrl}/projects/${projectId}`);
  }
}
