import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { WeeksApiService } from './weeks-api.service';

describe('WeeksApiService', () => {
  let service: WeeksApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeeksApiService],
    });
    service = TestBed.inject(WeeksApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call GET /weeks with query params', () => {
    service.listWeeks({ page: 1, size: 10, search: 'W1' }).subscribe();

    const req = httpMock.expectOne(
      (request) =>
        request.url === `${environment.apiBaseUrl}/weeks` &&
        request.params.get('page') === '1' &&
        request.params.get('size') === '10' &&
        request.params.get('search') === 'W1'
    );

    expect(req.request.method).toBe('GET');
    req.flush({
      content: [],
      page: { page: 1, size: 10, totalElements: 0, totalPages: 0 },
    });
  });
});
