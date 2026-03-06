import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AccountRegistrationRequest,
  AccountRegistrationResponse,
  AuthenticatedAccount,
  PasswordChangeRequest
} from '../../models/api.models';
import { ApiUrlService } from '../api-url.service';

@Injectable({ providedIn: 'root' })
export class AccountsApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly apiUrl: ApiUrlService
  ) {}

  registerAccount(payload: AccountRegistrationRequest): Observable<AccountRegistrationResponse> {
    return this.http.post<AccountRegistrationResponse>(this.apiUrl.path('/accounts'), payload);
  }

  getCurrentAccount(): Observable<AuthenticatedAccount> {
    return this.http.get<AuthenticatedAccount>(this.apiUrl.path('/accounts/me'));
  }

  changePassword(payload: PasswordChangeRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl.path('/password-changes'), payload);
  }
}
