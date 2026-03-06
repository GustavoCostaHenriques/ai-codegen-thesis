import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { vi } from 'vitest';
import { AuthService } from './auth.service';
import { AuthStoreService } from '../../core/services/auth-store.service';
import { Session } from '../../core/models/api.models';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let authStore: AuthStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, AuthStoreService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authStore = TestBed.inject(AuthStoreService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('posts credentials to create a session and stores the result', () => {
    const response: Session = {
      accessToken: 'token',
      tokenType: 'Bearer',
      expiresIn: 3600,
      user: {
        accountId: 'account-id',
        personId: 'person-id',
        name: 'Admin',
        username: 'admin',
        email: 'admin@weekly.local',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    };

    const setSessionSpy = vi.spyOn(authStore, 'setSession');

    service.login({ username: 'admin', password: 'admin12345' }).subscribe((session) => {
      expect(session).toEqual(response);
    });

    const request = httpTestingController.expectOne('http://localhost/sessions');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ username: 'admin', password: 'admin12345' });
    request.flush(response);

    expect(setSessionSpy).toHaveBeenCalledWith(response);
  });
});
