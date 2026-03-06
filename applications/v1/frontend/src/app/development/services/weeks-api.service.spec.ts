import { TestBed } from '@angular/core/testing';

import { WeeksApiService } from './weeks-api.service';

describe('WeeksApiService', () => {
  let service: WeeksApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeksApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
