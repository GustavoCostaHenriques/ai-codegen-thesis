import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  PasswordChangeRequest,
  Session,
  SessionCreateRequest,
} from '../../../shared/models/api.models';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  createSession(payload: SessionCreateRequest): Observable<Session> {
    return this.http.post<Session>(`${this.baseUrl}/sessions`, payload);
  }

  deleteCurrentSession(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/sessions/current`);
  }

  createPasswordChange(payload: PasswordChangeRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/password-changes`, payload);
  }
}
