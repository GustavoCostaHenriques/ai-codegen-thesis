import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PlanningService } from './planning.service';

describe('PlanningService', () => {
  let service: PlanningService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(PlanningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
