import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountRole, AuthenticatedAccount, LoginResponse } from '../models/api.models';

export interface SessionState {
  accessToken: string | null;
  expiresAt: number | null;
  account: AuthenticatedAccount | null;
}

const STORAGE_KEY = 'weekly_planning_session';

@Injectable({ providedIn: 'root' })
export class AuthSessionStore {
  private readonly subject = new BehaviorSubject<SessionState>(this.readInitialState());

  readonly state$ = this.subject.asObservable();

  get snapshot(): SessionState {
    return this.subject.value;
  }

  get token(): string | null {
    return this.snapshot.accessToken;
  }

  get account(): AuthenticatedAccount | null {
    return this.snapshot.account;
  }

  get isAuthenticated(): boolean {
    const { accessToken, expiresAt } = this.snapshot;
    if (!accessToken || !expiresAt) {
      return false;
    }

    return Date.now() < expiresAt;
  }

  hasRole(role: AccountRole): boolean {
    return this.snapshot.account?.role === role;
  }

  setSession(response: LoginResponse): void {
    const nextState: SessionState = {
      accessToken: response.accessToken,
      expiresAt: Date.now() + response.expiresIn * 1000,
      account: response.account
    };

    this.subject.next(nextState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  clearSession(): void {
    this.subject.next({ accessToken: null, expiresAt: null, account: null });
    localStorage.removeItem(STORAGE_KEY);
  }

  private readInitialState(): SessionState {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { accessToken: null, expiresAt: null, account: null };
    }

    try {
      const parsed = JSON.parse(raw) as SessionState;
      if (!parsed.accessToken || !parsed.expiresAt || Date.now() >= parsed.expiresAt) {
        return { accessToken: null, expiresAt: null, account: null };
      }
      return parsed;
    } catch {
      return { accessToken: null, expiresAt: null, account: null };
    }
  }
}
