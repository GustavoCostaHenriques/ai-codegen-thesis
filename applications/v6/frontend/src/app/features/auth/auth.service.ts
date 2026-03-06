import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthenticatedUser, PasswordChangeRequest, Session, SessionCreateRequest } from '../../core/models/api.models';
import { AuthStoreService } from '../../core/services/auth-store.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authStore = inject(AuthStoreService);
  private readonly apiBaseUrl = environment.apiBaseUrl;

  login(payload: SessionCreateRequest): Observable<Session> {
    return this.http.post<Session>(`${this.apiBaseUrl}/sessions`, payload).pipe(
      tap((session) => this.authStore.setSession(session)),
    );
  }

  logout(): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/sessions/current`).pipe(
      catchError(() => of(void 0)),
      tap(() => this.authStore.clear()),
    );
  }

  loadCurrentUser(): Observable<AuthenticatedUser> {
    return this.http.get<AuthenticatedUser>(`${this.apiBaseUrl}/me`).pipe(
      tap((user) => this.authStore.updateUser(user)),
    );
  }

  changePassword(payload: PasswordChangeRequest): Observable<void> {
    return this.http.post<void>(`${this.apiBaseUrl}/password-changes`, payload);
  }
}
