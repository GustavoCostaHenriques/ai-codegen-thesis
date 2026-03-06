import { Injectable, computed, signal } from '@angular/core';
import { AccountSummary, LoginResponse } from '../../development/models/account';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly tokenStorageKey = 'weekly-planning.token';
  private readonly accountStorageKey = 'weekly-planning.account';

  private readonly accountSignal = signal<AccountSummary | null>(this.readStoredAccount());
  private readonly tokenSignal = signal<string | null>(this.readStoredToken());

  readonly account = computed(() => this.accountSignal());
  readonly role = computed(() => this.accountSignal()?.role ?? null);
  readonly authenticated = computed(() => Boolean(this.accountSignal()) && Boolean(this.tokenSignal()));

  startSession(response: LoginResponse): void {
    this.accountSignal.set(response.account);
    this.tokenSignal.set(response.accessToken);
    this.writeStorage(this.accountStorageKey, JSON.stringify(response.account));
    this.writeStorage(this.tokenStorageKey, response.accessToken);
  }

  clearSession(): void {
    this.accountSignal.set(null);
    this.tokenSignal.set(null);
    this.removeStorage(this.accountStorageKey);
    this.removeStorage(this.tokenStorageKey);
  }

  getAccount(): AccountSummary | null {
    return this.accountSignal();
  }

  isAuthenticated(): boolean {
    return this.authenticated();
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  isAdmin(): boolean {
    return this.role() === 'ADMIN';
  }

  private readStoredAccount(): AccountSummary | null {
    const rawValue = this.readStorage(this.accountStorageKey);
    if (!rawValue) {
      return null;
    }

    try {
      return JSON.parse(rawValue) as AccountSummary;
    } catch {
      return null;
    }
  }

  private readStoredToken(): string | null {
    return this.readStorage(this.tokenStorageKey);
  }

  private readStorage(key: string): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private writeStorage(key: string, value: string): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore storage write errors in non-browser contexts.
    }
  }

  private removeStorage(key: string): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage removal errors in non-browser contexts.
    }
  }
}
