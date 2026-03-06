import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticatedUser, Session } from '../../shared/models/api.models';

interface StoredSession {
  accessToken: string;
  expiresAt: number;
}

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private static readonly STORAGE_KEY = 'weekly_planning_auth_session';

  private readonly tokenSubject = new BehaviorSubject<string | null>(null);
  private readonly userSubject = new BehaviorSubject<AuthenticatedUser | null>(
    null
  );

  readonly token$ = this.tokenSubject.asObservable();
  readonly user$ = this.userSubject.asObservable();

  constructor() {
    this.restoreSession();
  }

  setSession(session: Session): void {
    const expiresAt = Date.now() + session.expiresIn * 1000;
    const persisted: StoredSession = {
      accessToken: session.accessToken,
      expiresAt,
    };

    sessionStorage.setItem(
      AuthStateService.STORAGE_KEY,
      JSON.stringify(persisted)
    );
    this.tokenSubject.next(session.accessToken);
    this.userSubject.next(session.user);
  }

  setCurrentUser(user: AuthenticatedUser | null): void {
    this.userSubject.next(user);
  }

  getCurrentUser(): AuthenticatedUser | null {
    return this.userSubject.value;
  }

  getAccessToken(): string | null {
    const token = this.tokenSubject.value;
    if (!token) {
      return null;
    }

    const storageRaw = sessionStorage.getItem(AuthStateService.STORAGE_KEY);
    if (!storageRaw) {
      this.clearSession();
      return null;
    }

    try {
      const persisted = JSON.parse(storageRaw) as StoredSession;
      if (!persisted.expiresAt || persisted.expiresAt <= Date.now()) {
        this.clearSession();
        return null;
      }
      return persisted.accessToken;
    } catch {
      this.clearSession();
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  isAdmin(): boolean {
    return this.userSubject.value?.role === 'ADMIN';
  }

  clearSession(): void {
    sessionStorage.removeItem(AuthStateService.STORAGE_KEY);
    this.tokenSubject.next(null);
    this.userSubject.next(null);
  }

  private restoreSession(): void {
    const storageRaw = sessionStorage.getItem(AuthStateService.STORAGE_KEY);
    if (!storageRaw) {
      return;
    }

    try {
      const persisted = JSON.parse(storageRaw) as StoredSession;
      if (!persisted.expiresAt || persisted.expiresAt <= Date.now()) {
        this.clearSession();
        return;
      }
      this.tokenSubject.next(persisted.accessToken);
    } catch {
      this.clearSession();
    }
  }
}
