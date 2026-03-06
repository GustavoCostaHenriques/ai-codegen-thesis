import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { WeeksPageComponent } from './weeks-page.component';
import { WeeksService } from './weeks.service';
import { AuthStoreService } from '../../core/services/auth-store.service';

describe('WeeksPageComponent', () => {
  let fixture: ComponentFixture<WeeksPageComponent>;
  let component: WeeksPageComponent;
  let weeksService: {
    listWeeks: ReturnType<typeof vi.fn>;
    createWeek: ReturnType<typeof vi.fn>;
    updateWeek: ReturnType<typeof vi.fn>;
    duplicateWeek: ReturnType<typeof vi.fn>;
    deleteWeek: ReturnType<typeof vi.fn>;
    getWeek: ReturnType<typeof vi.fn>;
  };
  let authStore: AuthStoreService;

  beforeEach(async () => {
    weeksService = {
      listWeeks: vi.fn(),
      createWeek: vi.fn(),
      updateWeek: vi.fn(),
      duplicateWeek: vi.fn(),
      deleteWeek: vi.fn(),
      getWeek: vi.fn(),
    };
    weeksService.listWeeks.mockReturnValue(
      of({
        content: [
          {
            id: 'week-1',
            code: 'W1Feb2026',
            weekStart: '2026-02-02',
            weekEnd: '2026-02-06',
            status: 'PLANNED',
          },
        ],
        page: {
          page: 0,
          size: 4,
          totalElements: 1,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
        },
      }),
    );

    await TestBed.configureTestingModule({
      imports: [WeeksPageComponent],
      providers: [
        provideRouter([]),
        AuthStoreService,
        {
          provide: WeeksService,
          useValue: weeksService,
        },
      ],
    }).compileComponents();

    authStore = TestBed.inject(AuthStoreService);
    authStore.setSession({
      accessToken: 'token',
      tokenType: 'Bearer',
      expiresIn: 3600,
      user: {
        accountId: '1',
        personId: '2',
        name: 'Admin',
        username: 'admin',
        email: 'admin@weekly.local',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    });

    fixture = TestBed.createComponent(WeeksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads weeks on init', () => {
    expect(weeksService.listWeeks).toHaveBeenCalled();
    expect(component.weeks().length).toBe(1);
  });

  it('opens the create modal for admin users', () => {
    component.openCreateModal();
    expect(component.weekModalOpen()).toBe(true);
  });
});
