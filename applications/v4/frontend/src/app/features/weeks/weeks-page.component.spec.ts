import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { WeeksPageComponent } from './weeks-page.component';
import { WeeksApiService } from '../../core/services/api/weeks-api.service';
import { AuthSessionStore } from '../../core/services/auth-session.store';
import { AuditLogService } from '../../core/services/audit-log.service';

class WeeksApiMock {
  listWeeks = jasmine.createSpy('listWeeks').and.returnValue(
    of({
      content: [
        {
          weekId: '3737f4bc-bf7d-4ae2-82df-c08ccaa1827b',
          weekStart: '2026-02-02',
          weekEnd: '2026-02-06',
          status: 'PLANNED'
        }
      ],
      page: { page: 0, size: 20, totalElements: 1, totalPages: 1 }
    })
  );
  createWeek = jasmine.createSpy('createWeek').and.returnValue(of(void 0));
  updateWeekById = jasmine.createSpy('updateWeekById').and.returnValue(of(void 0));
  deleteWeekById = jasmine.createSpy('deleteWeekById').and.returnValue(of(void 0));
}

class AuthStoreMock {
  account = { role: 'ADMIN' } as any;
}

class RouterMock {
  navigate = jasmine.createSpy('navigate');
}

describe('WeeksPageComponent', () => {
  let fixture: ComponentFixture<WeeksPageComponent>;
  let component: WeeksPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeksPageComponent],
      providers: [
        { provide: WeeksApiService, useClass: WeeksApiMock },
        { provide: AuthSessionStore, useClass: AuthStoreMock },
        { provide: Router, useClass: RouterMock },
        AuditLogService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeeksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('loads week rows', () => {
    expect(component.weeks.length).toBe(1);
    expect(component.weeks[0].weekStart).toBe('2026-02-02');
  });

  it('navigates to planning on openPlanning', () => {
    const router = TestBed.inject(Router) as unknown as RouterMock;
    component.openPlanning('3737f4bc-bf7d-4ae2-82df-c08ccaa1827b');
    expect(router.navigate).toHaveBeenCalledWith(['/weeks', '3737f4bc-bf7d-4ae2-82df-c08ccaa1827b', 'planning']);
  });
});
