import { computed, Injectable, signal } from '@angular/core';
import { AuthenticatedAccount, LoginResponse } from '../models/api.models';

const TOKEN_STORAGE_KEY = 'weekly-planning.access-token';
const ACCOUNT_STORAGE_KEY = 'weekly-planning.account';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly tokenSignal = signal<string | null>(this.readToken());
  private readonly accountSignal = signal<AuthenticatedAccount | null>(this.readAccount());

  readonly token = this.tokenSignal.asReadonly();
  readonly account = this.accountSignal.asReadonly();
  readonly isAuthenticated = computed(() => Boolean(this.tokenSignal()));
  readonly isAdmin = computed(() => this.accountSignal()?.role === 'ADMIN');

  setSession(response: LoginResponse): void {
    this.tokenSignal.set(response.accessToken);
    this.accountSignal.set(response.account);
    this.writeStorage(TOKEN_STORAGE_KEY, response.accessToken);
    this.writeStorage(ACCOUNT_STORAGE_KEY, JSON.stringify(response.account));
  }

  setAccount(account: AuthenticatedAccount): void {
    this.accountSignal.set(account);
    this.writeStorage(ACCOUNT_STORAGE_KEY, JSON.stringify(account));
  }

  clearSession(): void {
    this.tokenSignal.set(null);
    this.accountSignal.set(null);
    this.removeStorage(TOKEN_STORAGE_KEY);
    this.removeStorage(ACCOUNT_STORAGE_KEY);
  }

  private readToken(): string | null {
    return this.readStorage(TOKEN_STORAGE_KEY);
  }

  private readAccount(): AuthenticatedAccount | null {
    const rawAccount = this.readStorage(ACCOUNT_STORAGE_KEY);
    if (!rawAccount) {
      return null;
    }

    try {
      return JSON.parse(rawAccount) as AuthenticatedAccount;
    } catch {
      this.removeStorage(ACCOUNT_STORAGE_KEY);
      return null;
    }
  }

  private readStorage(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private writeStorage(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore storage write errors.
    }
  }

  private removeStorage(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage removal errors.
    }
  }
}
