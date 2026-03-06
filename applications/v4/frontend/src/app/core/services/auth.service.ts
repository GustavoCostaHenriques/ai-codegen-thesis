import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthenticatedAccount, LoginRequest, LoginResponse } from '../models/api.models';
import { AccountsApiService } from './api/accounts-api.service';
import { AuthApiService } from './api/auth-api.service';
import { AuditLogService } from './audit-log.service';
import { AuthSessionStore } from './auth-session.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly authApi: AuthApiService,
    private readonly accountsApi: AccountsApiService,
    private readonly auditLog: AuditLogService,
    private readonly sessionStore: AuthSessionStore
  ) {}

  get account(): AuthenticatedAccount | null {
    return this.sessionStore.account;
  }

  get isAuthenticated(): boolean {
    return this.sessionStore.isAuthenticated;
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.authApi.createAuthSession(payload).pipe(
      tap((response) => {
        this.sessionStore.setSession(response);
        this.auditLog.log('login_success', { username: payload.username });
      })
    );
  }

  restoreAccount(): Observable<AuthenticatedAccount | null> {
    if (!this.sessionStore.isAuthenticated) {
      return of(null);
    }

    return this.accountsApi.getCurrentAccount().pipe(
      map((account) => {
        const current = this.sessionStore.snapshot;
        if (!current.accessToken || !current.expiresAt) {
          return null;
        }

        this.sessionStore.setSession({
          accessToken: current.accessToken,
          tokenType: 'Bearer',
          expiresIn: Math.max(1, Math.floor((current.expiresAt - Date.now()) / 1000)),
          account
        });
        return account;
      }),
      catchError(() => {
        this.sessionStore.clearSession();
        return of(null);
      })
    );
  }

  logout(): Observable<void> {
    return this.authApi.deleteCurrentAuthSession().pipe(
      catchError(() => of(void 0)),
      tap(() => {
        this.auditLog.log('logout', { accountId: this.sessionStore.account?.accountId });
        this.sessionStore.clearSession();
      }),
      switchMap(() => of(void 0))
    );
  }
}
