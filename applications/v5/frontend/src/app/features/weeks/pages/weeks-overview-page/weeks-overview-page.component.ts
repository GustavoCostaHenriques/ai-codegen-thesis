import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ApiErrorService } from '../../../../core/services/api-error.service';
import { AuthStateService } from '../../../../core/services/auth-state.service';
import { EventLogService } from '../../../../core/services/event-log.service';
import { WeeksApiService } from '../../../../core/services/api/weeks-api.service';
import { WeekStatus, WeekSummary } from '../../../../shared/models/api.models';

type WeekModalMode = 'create' | 'edit' | 'duplicate';

@Component({
  selector: 'app-weeks-overview-page',
  templateUrl: './weeks-overview-page.component.html',
  styleUrl: './weeks-overview-page.component.css',
  standalone: false,
})
export class WeeksOverviewPageComponent implements OnInit, OnDestroy {
  weeks: WeekSummary[] = [];
  loading = false;
  saving = false;
  deleting = false;
  errorMessage = '';
  modalError = '';
  search = '';

  page = 0;
  size = 10;
  totalElements = 0;
  totalPages = 0;

  weekModalOpen = false;
  removeModalOpen = false;
  modalMode: WeekModalMode = 'create';
  selectedWeek: WeekSummary | null = null;

  private readonly destroy$ = new Subject<void>();
  private readonly formBuilder = inject(FormBuilder);

  readonly weekForm = this.formBuilder.group({
    weekStart: ['', [Validators.required]],
    weekEnd: ['', [Validators.required]],
    status: ['PLANNED' as WeekStatus, [Validators.required]],
  });

  constructor(
    private readonly weeksApiService: WeeksApiService,
    private readonly router: Router,
    private readonly apiErrorService: ApiErrorService,
    private readonly authStateService: AuthStateService,
    private readonly eventLogService: EventLogService
  ) {}

  ngOnInit(): void {
    this.loadWeeks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isAdmin(): boolean {
    return this.authStateService.isAdmin();
  }

  get fromIndex(): number {
    return this.totalElements === 0 ? 0 : this.page * this.size + 1;
  }

  get toIndex(): number {
    return Math.min((this.page + 1) * this.size, this.totalElements);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index);
  }

  loadWeeks(page = this.page): void {
    this.loading = true;
    this.errorMessage = '';
    this.page = page;

    this.weeksApiService
      .listWeeks({
        page: this.page,
        size: this.size,
        search: this.search.trim() || undefined,
      })
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          this.weeks = response.content;
          this.totalElements = response.page.totalElements;
          this.totalPages = response.page.totalPages;
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.errorMessage = parsedError.message;
          this.eventLogService.log('weeks.list.error', parsedError);
        },
      });
  }

  searchWeeks(): void {
    this.loadWeeks(0);
  }

  goToPlanning(weekId: string): void {
    this.router.navigate(['/weeks', weekId, 'planning']);
  }

  openCreateModal(): void {
    this.modalMode = 'create';
    this.selectedWeek = null;
    this.modalError = '';
    this.weekForm.reset({
      weekStart: '',
      weekEnd: '',
      status: 'PLANNED',
    });
    this.weekModalOpen = true;
  }

  openEditModal(week: WeekSummary): void {
    this.modalMode = 'edit';
    this.selectedWeek = week;
    this.modalError = '';
    this.weekForm.reset({
      weekStart: week.weekStart,
      weekEnd: week.weekEnd,
      status: week.status,
    });
    this.weekModalOpen = true;
  }

  openDuplicateModal(week: WeekSummary): void {
    this.modalMode = 'duplicate';
    this.selectedWeek = week;
    this.modalError = '';
    this.weekForm.reset({
      weekStart: week.weekStart,
      weekEnd: week.weekEnd,
      status: 'PLANNED',
    });
    this.weekModalOpen = true;
  }

  closeWeekModal(): void {
    this.weekModalOpen = false;
  }

  saveWeek(): void {
    this.modalError = '';
    if (this.weekForm.invalid) {
      this.weekForm.markAllAsTouched();
      return;
    }

    const weekStart = this.weekForm.controls.weekStart.value ?? '';
    const weekEnd = this.weekForm.controls.weekEnd.value ?? '';
    const status = this.weekForm.controls.status.value ?? 'PLANNED';

    this.saving = true;

    if (this.modalMode === 'create') {
      this.weeksApiService
        .createWeek({ weekStart, weekEnd })
        .pipe(
          finalize(() => {
            this.saving = false;
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: () => {
            this.weekModalOpen = false;
            this.loadWeeks();
            this.eventLogService.log('weeks.create.success', { weekStart, weekEnd });
          },
          error: (error: unknown) => {
            const parsedError = this.apiErrorService.parse(error);
            this.modalError = parsedError.message;
          },
        });
      return;
    }

    if (this.modalMode === 'edit' && this.selectedWeek) {
      this.weeksApiService
        .updateWeek(this.selectedWeek.id, { weekStart, weekEnd, status })
        .pipe(
          finalize(() => {
            this.saving = false;
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: () => {
            this.weekModalOpen = false;
            this.loadWeeks();
            this.eventLogService.log('weeks.update.success', {
              weekId: this.selectedWeek?.id,
            });
          },
          error: (error: unknown) => {
            const parsedError = this.apiErrorService.parse(error);
            this.modalError = parsedError.message;
          },
        });
      return;
    }

    if (this.modalMode === 'duplicate' && this.selectedWeek) {
      this.weeksApiService
        .createWeekDuplicate(this.selectedWeek.id, { weekStart, weekEnd, status })
        .pipe(
          finalize(() => {
            this.saving = false;
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: () => {
            this.weekModalOpen = false;
            this.loadWeeks();
            this.eventLogService.log('weeks.duplicate.success', {
              weekId: this.selectedWeek?.id,
            });
          },
          error: (error: unknown) => {
            const parsedError = this.apiErrorService.parse(error);
            this.modalError = parsedError.message;
          },
        });
    }
  }

  openRemoveModal(week: WeekSummary): void {
    this.selectedWeek = week;
    this.removeModalOpen = true;
    this.modalError = '';
  }

  closeRemoveModal(): void {
    this.removeModalOpen = false;
  }

  deleteWeek(): void {
    if (!this.selectedWeek) {
      return;
    }

    this.deleting = true;
    this.modalError = '';

    this.weeksApiService
      .deleteWeek(this.selectedWeek.id)
      .pipe(
        finalize(() => {
          this.deleting = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.removeModalOpen = false;
          this.loadWeeks(this.page > 0 && this.weeks.length === 1 ? this.page - 1 : this.page);
          this.eventLogService.log('weeks.delete.success', {
            weekId: this.selectedWeek?.id,
          });
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.modalError = parsedError.message;
        },
      });
  }
}
