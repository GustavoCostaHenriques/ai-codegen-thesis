import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AccountRegistrationRequest,
  AccountRegistrationResponse,
  AuthenticatedAccount,
  LoginRequest,
  LoginResponse,
  PasswordChangeRequest,
} from '../../models/api.models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  createAuthSession(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiBaseUrl}/auth/sessions`, request);
  }

  deleteCurrentAuthSession() {
    return this.http.delete<void>(`${this.apiBaseUrl}/auth/sessions/current`);
  }

  registerAccount(request: AccountRegistrationRequest) {
    return this.http.post<AccountRegistrationResponse>(`${this.apiBaseUrl}/accounts`, request);
  }

  getCurrentAccount() {
    return this.http.get<AuthenticatedAccount>(`${this.apiBaseUrl}/accounts/me`);
  }

  changePassword(request: PasswordChangeRequest) {
    return this.http.post<void>(`${this.apiBaseUrl}/password-changes`, request);
  }
}
