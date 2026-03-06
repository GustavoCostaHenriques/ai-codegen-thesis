import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthApiService } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(AuthApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call POST /auth/sessions', () => {
    const payload = { username: 'admin@weekly.local', password: 'admin12345' };

    service.createAuthSession(payload).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/v1/auth/sessions');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush({
      accessToken: 'token',
      tokenType: 'Bearer',
      expiresIn: 1200,
      account: {
        accountId: '550e8400-e29b-41d4-a716-446655440000',
        personId: '550e8400-e29b-41d4-a716-446655440001',
        username: 'admin@weekly.local',
        name: 'Admin',
        email: 'admin@weekly.local',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    });
  });

  it('should call POST /password-changes', () => {
    const payload = {
      username: 'viewer@example.com',
      currentPassword: 'viewer12345',
      newPassword: 'viewer67890',
      confirmNewPassword: 'viewer67890',
    };

    service.changePassword(payload).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/v1/password-changes');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(null);
  });
});
