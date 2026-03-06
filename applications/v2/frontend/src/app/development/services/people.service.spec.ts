import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PeopleService } from './people.service';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(PeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
