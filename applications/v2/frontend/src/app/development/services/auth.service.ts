import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SessionService } from '../../core/services/session.service';
import {
  AccountCreateRequest,
  AccountResponse,
  AccountSummary,
  LoginRequest,
  LoginResponse,
} from '../models/account';
import { API_PATHS } from './api-paths';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly apiHttp: ApiHttpService,
    private readonly sessionService: SessionService,
  ) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.apiHttp
      .request<LoginResponse>('POST', API_PATHS.authLogin, request)
      .pipe(tap(response => this.sessionService.startSession(response)));
  }

  createAccount(request: AccountCreateRequest): Observable<AccountResponse> {
    return this.apiHttp.request<AccountResponse>('POST', API_PATHS.accounts, request);
  }

  logout(): void {
    this.sessionService.clearSession();
  }

  getCurrentAccount(): AccountSummary | null {
    return this.sessionService.getAccount();
  }

  isAuthenticated(): boolean {
    return this.sessionService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.sessionService.isAdmin();
  }
}
