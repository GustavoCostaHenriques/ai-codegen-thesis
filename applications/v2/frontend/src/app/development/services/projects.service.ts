import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ProjectCreateRequest, ProjectsPage, ProjectUpdateRequest } from '../models/project';
import { ProjectsQuery } from '../models/requests';
import { API_PATHS } from './api-paths';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private readonly apiHttp: ApiHttpService) {}

  listProjects(query: ProjectsQuery = {}): Observable<ProjectsPage> {
    return this.apiHttp.request<ProjectsPage>('GET', API_PATHS.projects, undefined, query);
  }

  getProject(projectId: string): Observable<Project> {
    return this.apiHttp.request<Project>('GET', API_PATHS.projectById(projectId));
  }

  createProject(request: ProjectCreateRequest): Observable<Project> {
    return this.apiHttp.request<Project>('POST', API_PATHS.projects, request);
  }

  updateProject(projectId: string, request: ProjectUpdateRequest): Observable<Project> {
    return this.apiHttp.request<Project>('PUT', API_PATHS.projectById(projectId), request);
  }

  deleteProject(projectId: string): Observable<void> {
    return this.apiHttp.request<void>('DELETE', API_PATHS.projectById(projectId));
  }
}
