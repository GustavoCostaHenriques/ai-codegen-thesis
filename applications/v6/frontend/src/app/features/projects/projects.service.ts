import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PagedProjects,
  Project,
  ProjectCreateRequest,
  ProjectsQuery,
  ProjectUpdateRequest,
} from '../../core/models/api.models';
import { buildHttpParams } from '../../core/utils/http.util';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiBaseUrl;

  listProjects(query: ProjectsQuery): Observable<PagedProjects> {
    return this.http.get<PagedProjects>(`${this.apiBaseUrl}/projects`, {
      params: buildHttpParams({
        page: query.page,
        size: query.size,
        search: query.search,
        sort: query.sort,
        status: query.status,
      }),
    });
  }

  getProject(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiBaseUrl}/projects/${projectId}`);
  }

  createProject(payload: ProjectCreateRequest): Observable<Project> {
    return this.http.post<Project>(`${this.apiBaseUrl}/projects`, payload);
  }

  updateProject(projectId: string, payload: ProjectUpdateRequest): Observable<Project> {
    return this.http.put<Project>(`${this.apiBaseUrl}/projects/${projectId}`, payload);
  }

  deleteProject(projectId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/projects/${projectId}`);
  }
}
