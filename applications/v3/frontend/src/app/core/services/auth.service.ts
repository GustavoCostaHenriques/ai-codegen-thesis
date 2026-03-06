import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import {
  AccountRegistrationRequest,
  LoginRequest,
  PasswordChangeRequest,
} from '../models/api.models';
import { AuthApiService } from './api/auth-api.service';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly authApiService: AuthApiService,
    private readonly sessionService: SessionService,
    private readonly router: Router,
  ) {}

  login(request: LoginRequest) {
    return this.authApiService.createAuthSession(request).pipe(
      tap((response) => this.sessionService.setSession(response)),
    );
  }

  registerAccount(request: AccountRegistrationRequest) {
    return this.authApiService.registerAccount(request);
  }

  changePassword(request: PasswordChangeRequest) {
    return this.authApiService.changePassword(request);
  }

  refreshCurrentAccount() {
    return this.authApiService.getCurrentAccount().pipe(
      tap((account) => this.sessionService.setAccount(account)),
    );
  }

  logout() {
    return this.authApiService.deleteCurrentAuthSession().pipe(
      catchError(() => of(void 0)),
      tap(() => this.sessionService.clearSession()),
      tap(() => void this.router.navigate(['/login'])),
      map(() => void 0),
    );
  }
}
