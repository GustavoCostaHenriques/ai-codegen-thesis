import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { WeeksApiService } from './weeks-api.service';

describe('WeeksApiService', () => {
  let service: WeeksApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeeksApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(WeeksApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should request paginated weeks with query params', () => {
    service.listWeeks({ page: 1, size: 10, sort: ['weekStart,asc'], status: 'PLANNED' }).subscribe();

    const req = httpMock.expectOne((request) =>
      request.url === 'http://localhost:8080/api/v1/weeks' &&
      request.params.get('page') === '1' &&
      request.params.get('size') === '10' &&
      request.params.get('sort') === 'weekStart,asc' &&
      request.params.get('status') === 'PLANNED',
    );

    expect(req.request.method).toBe('GET');
    req.flush({
      content: [],
      page: {
        page: 1,
        size: 10,
        totalElements: 0,
        totalPages: 0,
      },
    });
  });

  it('should call PUT /weeks/{weekId}', () => {
    const weekId = '550e8400-e29b-41d4-a716-446655440002';

    service
      .updateWeekById(weekId, {
        weekStart: '2026-02-02',
        weekEnd: '2026-02-06',
        status: 'COMPLETED',
      })
      .subscribe();

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/weeks/${weekId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({
      weekId,
      weekStart: '2026-02-02',
      weekEnd: '2026-02-06',
      status: 'COMPLETED',
      createdAt: '2026-02-01T08:00:00Z',
      updatedAt: '2026-02-01T09:00:00Z',
    });
  });
});
