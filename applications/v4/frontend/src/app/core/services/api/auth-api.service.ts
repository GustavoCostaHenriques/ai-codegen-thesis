import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../models/api.models';
import { ApiUrlService } from '../api-url.service';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly apiUrl: ApiUrlService
  ) {}

  createAuthSession(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl.path('/auth/sessions'), payload);
  }

  deleteCurrentAuthSession(): Observable<void> {
    return this.http.delete<void>(this.apiUrl.path('/auth/sessions/current'));
  }
}
