import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DayPerson, DayPersonProject, Task } from '../models/planning';
import { AddPersonToDayRequest, AddProjectToPersonRequest, AddTaskRequest } from '../models/requests';
import { API_PATHS } from './api-paths';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root',
})
export class PlanningService {
  constructor(private readonly apiHttp: ApiHttpService) {}

  addPersonToDay(weekId: string, date: string, request: AddPersonToDayRequest): Observable<DayPerson> {
    return this.apiHttp.request<DayPerson>('POST', API_PATHS.weekDayPeople(weekId, date), request);
  }

  removePersonFromDay(weekId: string, date: string, personId: string): Observable<void> {
    return this.apiHttp.request<void>('DELETE', API_PATHS.weekDayPerson(weekId, date, personId));
  }

  addProjectToPerson(
    weekId: string,
    date: string,
    personId: string,
    request: AddProjectToPersonRequest,
  ): Observable<DayPersonProject> {
    return this.apiHttp.request<DayPersonProject>('POST', API_PATHS.weekDayPersonProjects(weekId, date, personId), request);
  }

  removeProjectFromPerson(weekId: string, date: string, personId: string, projectId: string): Observable<void> {
    return this.apiHttp.request<void>('DELETE', API_PATHS.weekDayPersonProject(weekId, date, personId, projectId));
  }

  addTaskToProject(
    weekId: string,
    date: string,
    personId: string,
    projectId: string,
    request: AddTaskRequest,
  ): Observable<Task> {
    return this.apiHttp.request<Task>('POST', API_PATHS.weekDayPersonProjectTasks(weekId, date, personId, projectId), request);
  }

  removeTaskFromProject(
    weekId: string,
    date: string,
    personId: string,
    projectId: string,
    taskId: string,
  ): Observable<void> {
    return this.apiHttp.request<void>(
      'DELETE',
      API_PATHS.weekDayPersonProjectTask(weekId, date, personId, projectId, taskId),
    );
  }
}
