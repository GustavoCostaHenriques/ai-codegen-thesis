import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateProjectRequest,
  ListProjectsQuery,
  ProjectDetail,
  ProjectPage,
  UpdateProjectRequest
} from '../../models/api.models';
import { ApiUrlService } from '../api-url.service';
import { buildHttpParams } from '../http-query.util';

@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly apiUrl: ApiUrlService
  ) {}

  listProjects(query: ListProjectsQuery): Observable<ProjectPage> {
    return this.http.get<ProjectPage>(this.apiUrl.path('/projects'), {
      params: buildHttpParams(query)
    });
  }

  createProject(payload: CreateProjectRequest): Observable<ProjectDetail> {
    return this.http.post<ProjectDetail>(this.apiUrl.path('/projects'), payload);
  }

  getProjectById(projectId: string): Observable<ProjectDetail> {
    return this.http.get<ProjectDetail>(this.apiUrl.path(`/projects/${projectId}`));
  }

  updateProjectById(projectId: string, payload: UpdateProjectRequest): Observable<ProjectDetail> {
    return this.http.put<ProjectDetail>(this.apiUrl.path(`/projects/${projectId}`), payload);
  }

  deleteProjectById(projectId: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl.path(`/projects/${projectId}`));
  }
}
