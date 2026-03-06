import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { SessionCreateRequest } from '../../../shared/models/api.models';
import { AuthApiService } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthApiService],
    });
    service = TestBed.inject(AuthApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call POST /sessions', () => {
    const payload: SessionCreateRequest = {
      username: 'admin',
      password: 'admin12345',
    };

    service.createSession(payload).subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/sessions`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush({
      accessToken: 'token',
      tokenType: 'Bearer',
      expiresIn: 3600,
      user: {
        accountId: '00000000-0000-0000-0000-000000000001',
        personId: '00000000-0000-0000-0000-000000000002',
        name: 'Admin',
        username: 'admin',
        email: 'admin@weekly.local',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    });
  });
});
