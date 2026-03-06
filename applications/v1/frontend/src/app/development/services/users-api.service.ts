import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, UserCreateRequest, UsersPage, UserUpdateRequest } from '../models/api-models';
import { API_BASE_PATH, apiPath } from './api-paths';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(private readonly http: HttpClient) {}

  listUsers(page = 0, size = 20): Observable<UsersPage> {
    const path = apiPath.users();
    const params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this.http
      .get<UsersPage>(this.toUrl(path), { params })
      .pipe(catchError(this.handleError('listUsers')));
  }

  createUser(payload: UserCreateRequest): Observable<User> {
    const path = apiPath.users();
    return this.http
      .post<User>(this.toUrl(path), payload)
      .pipe(catchError(this.handleError('createUser')));
  }

  getUser(userId: string): Observable<User> {
    const path = apiPath.userById(userId);
    return this.http
      .get<User>(this.toUrl(path))
      .pipe(catchError(this.handleError('getUser')));
  }

  updateUser(userId: string, payload: UserUpdateRequest): Observable<User> {
    const path = apiPath.userById(userId);
    return this.http
      .put<User>(this.toUrl(path), payload)
      .pipe(catchError(this.handleError('updateUser')));
  }

  deleteUser(userId: string): Observable<void> {
    const path = apiPath.userById(userId);
    return this.http
      .delete<void>(this.toUrl(path))
      .pipe(catchError(this.handleError('deleteUser')));
  }

  private toUrl(path: string): string {
    return `${API_BASE_PATH}${path}`;
  }

  private handleError(operation: string) {
    return (error: unknown): Observable<never> => {
      console.error(`[UsersApiService] ${operation} failed`, error);
      return throwError(() => error);
    };
  }
}
