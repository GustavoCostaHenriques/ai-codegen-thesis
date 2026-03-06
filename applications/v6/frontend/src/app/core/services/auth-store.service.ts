import { computed, Injectable, signal } from '@angular/core';
import { AuthenticatedUser, Session } from '../models/api.models';

interface PersistedSession {
  receivedAt: number;
  session: Session;
}

@Injectable({ providedIn: 'root' })
export class AuthStoreService {
  private readonly storageKey = 'weekly-planning.session';
  private readonly sessionState = signal<Session | null>(this.hydrate());

  readonly session = computed(() => this.sessionState());
  readonly user = computed(() => this.sessionState()?.user ?? null);
  readonly accessToken = computed(() => this.sessionState()?.accessToken ?? null);
  readonly isAuthenticated = computed(() => Boolean(this.accessToken()));
  readonly isAdmin = computed(() => this.user()?.role === 'ADMIN');
  readonly isViewer = computed(() => this.user()?.role === 'VIEWER');

  setSession(session: Session): void {
    this.sessionState.set(session);
    this.persist(session);
  }

  updateUser(user: AuthenticatedUser): void {
    const currentSession = this.sessionState();
    if (!currentSession) {
      return;
    }

    const updatedSession: Session = {
      ...currentSession,
      user,
    };

    this.sessionState.set(updatedSession);
    this.persist(updatedSession);
  }

  clear(): void {
    this.sessionState.set(null);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(this.storageKey);
    }
  }

  private hydrate(): Session | null {
    if (typeof sessionStorage === 'undefined') {
      return null;
    }

    const raw = sessionStorage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }

    try {
      const persisted = JSON.parse(raw) as PersistedSession;
      const expiresAt = persisted.receivedAt + persisted.session.expiresIn * 1000;

      if (Date.now() >= expiresAt) {
        sessionStorage.removeItem(this.storageKey);
        return null;
      }

      return persisted.session;
    } catch {
      sessionStorage.removeItem(this.storageKey);
      return null;
    }
  }

  private persist(session: Session): void {
    if (typeof sessionStorage === 'undefined') {
      return;
    }

    const payload: PersistedSession = {
      receivedAt: Date.now(),
      session,
    };

    sessionStorage.setItem(this.storageKey, JSON.stringify(payload));
  }
}
