import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthApiService } from './auth-api.service';
import { ApiUrlService } from '../api-url.service';
import { LoginResponse } from '../../models/api.models';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthApiService, ApiUrlService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(AuthApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('creates auth session', () => {
    const payload = { username: 'admin@weekly.local', password: 'admin12345' };
    const response: LoginResponse = {
      accessToken: 'token-value',
      tokenType: 'Bearer',
      expiresIn: 3600,
      account: {
        accountId: '9a2b14da-8efe-4ede-a6e0-ec18fb9f3d5f',
        personId: '32d6f40a-9f85-4e37-a5cf-ce61295d3023',
        username: 'admin@weekly.local',
        name: 'Admin',
        email: 'admin@weekly.local',
        role: 'ADMIN',
        status: 'ACTIVE'
      }
    };

    service.createAuthSession(payload).subscribe((result) => {
      expect(result.accessToken).toBe('token-value');
      expect(result.account.role).toBe('ADMIN');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/auth/sessions');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(response);
  });

  it('deletes current auth session', () => {
    service.deleteCurrentAuthSession().subscribe((result) => {
      expect(result).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/auth/sessions/current');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
