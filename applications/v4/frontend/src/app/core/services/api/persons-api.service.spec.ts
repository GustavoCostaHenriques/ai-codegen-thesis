import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApiUrlService } from '../api-url.service';
import { PersonsApiService } from './persons-api.service';

describe('PersonsApiService', () => {
  let service: PersonsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonsApiService, ApiUrlService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(PersonsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('lists persons with pagination and filters', () => {
    service
      .listPersons({ page: 1, size: 10, sort: ['name,asc'], search: 'ana', role: 'ADMIN', status: 'ACTIVE' })
      .subscribe((result) => {
        expect(result.content.length).toBe(1);
        expect(result.page.totalElements).toBe(1);
      });

    const req = httpMock.expectOne((request) => request.url === 'http://localhost:8080/api/v1/persons');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('size')).toBe('10');
    expect(req.request.params.getAll('sort')).toEqual(['name,asc']);
    expect(req.request.params.get('search')).toBe('ana');
    expect(req.request.params.get('role')).toBe('ADMIN');
    expect(req.request.params.get('status')).toBe('ACTIVE');

    req.flush({
      content: [
        {
          personId: '2ce95f55-dca6-4ff9-84de-6dc3f25ef7c4',
          accountId: 'cb5fa49f-ff7c-4f9b-8f72-2665f52fbc5b',
          username: 'ana@company.pt',
          name: 'Ana Silva',
          email: 'ana@company.pt',
          role: 'ADMIN',
          status: 'ACTIVE'
        }
      ],
      page: {
        page: 1,
        size: 10,
        totalElements: 1,
        totalPages: 1,
        sort: [{ property: 'name', direction: 'asc' }]
      }
    });
  });

  it('creates person', () => {
    const payload = {
      name: 'Bruno Costa',
      username: 'bruno@company.pt',
      email: 'bruno@company.pt',
      password: 'viewer12345',
      role: 'VIEWER' as const,
      status: 'ACTIVE' as const
    };

    service.createPerson(payload).subscribe((result) => {
      expect(result.personId).toBe('a7b590f0-a0f1-4f1b-8b5c-cad10d87d5fd');
      expect(result.role).toBe('VIEWER');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/persons');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush({
      personId: 'a7b590f0-a0f1-4f1b-8b5c-cad10d87d5fd',
      accountId: 'eaef9dc2-4fda-43f8-93eb-d94342ea23cb',
      username: 'bruno@company.pt',
      name: 'Bruno Costa',
      email: 'bruno@company.pt',
      role: 'VIEWER',
      status: 'ACTIVE',
      createdAt: '2026-02-01T10:00:00Z',
      updatedAt: '2026-02-01T10:00:00Z'
    });
  });
});
