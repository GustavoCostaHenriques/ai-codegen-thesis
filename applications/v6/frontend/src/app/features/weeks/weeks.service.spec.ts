import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { WeeksService } from './weeks.service';

describe('WeeksService', () => {
  let service: WeeksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeeksService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(WeeksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('queries weeks using the OpenAPI pagination and filter parameters', () => {
    service
      .listWeeks({
        page: 1,
        size: 4,
        search: 'W1',
        status: 'PLANNED',
        sort: ['weekStart,asc'],
      })
      .subscribe();

    const request = httpTestingController.expectOne((req) => req.url === 'http://localhost/weeks');
    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('page')).toBe('1');
    expect(request.request.params.get('size')).toBe('4');
    expect(request.request.params.get('search')).toBe('W1');
    expect(request.request.params.get('status')).toBe('PLANNED');
    expect(request.request.params.getAll('sort')).toEqual(['weekStart,asc']);

    request.flush({
      content: [],
      page: {
        page: 1,
        size: 4,
        totalElements: 0,
        totalPages: 0,
        hasNext: false,
        hasPrevious: true,
      },
    });
  });
});
