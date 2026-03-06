import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { PageMetadata, WeekStatus, WeekSummary } from '../../../core/models/api.models';
import { formatWeekRange, generateWeekCode } from '../../../core/services/date-utils';
import { ErrorMapperService } from '../../../core/services/error-mapper.service';
import { WeeksApiService } from '../../../core/services/api/weeks-api.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SessionService } from '../../../core/services/session.service';
import { TopNavComponent } from '../../../shared/components/top-nav.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-weeks-overview',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    TopNavComponent,
    ModalComponent,
    PaginationComponent,
  ],
  templateUrl: './weeks-overview.component.html',
  styleUrls: ['./weeks-overview.component.css'],
})
export class WeeksOverviewComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  readonly weekForm = this.formBuilder.nonNullable.group({
    weekStart: ['', [Validators.required]],
    weekEnd: ['', [Validators.required]],
    status: ['PLANNED' as WeekStatus, [Validators.required]],
  });

  readonly statusOptions: WeekStatus[] = ['PLANNED', 'COMPLETED'];

  weeks: WeekSummary[] = [];
  pageMetadata: PageMetadata | null = null;

  loading = false;
  submitting = false;
  deleting = false;

  pageSize = 10;
  errorMessage = '';
  formErrorMessage = '';

  isWeekModalOpen = false;
  isDeleteModalOpen = false;
  weekModalMode: 'create' | 'edit' = 'create';
  selectedWeek: WeekSummary | null = null;

  constructor(
    private readonly weeksApiService: WeeksApiService,
    private readonly sessionService: SessionService,
    private readonly errorMapper: ErrorMapperService,
    private readonly i18nService: I18nService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadWeeks();
  }

  get canManageWeeks(): boolean {
    return this.sessionService.isAdmin();
  }

  loadWeeks(page: number = 0): void {
    this.loading = true;
    this.errorMessage = '';

    this.weeksApiService
      .listWeeks({
        page,
        size: this.pageSize,
        sort: ['weekStart,asc'],
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.weeks = response.content;
          this.pageMetadata = response.page;
        },
        error: (error: unknown) => {
          this.errorMessage = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('weeks.loadFailed'),
          );
        },
      });
  }

  openCreateWeekModal(): void {
    this.weekModalMode = 'create';
    this.selectedWeek = null;
    this.formErrorMessage = '';
    this.weekForm.reset({
      weekStart: '',
      weekEnd: '',
      status: 'PLANNED',
    });
    this.isWeekModalOpen = true;
  }

  openEditWeekModal(week: WeekSummary): void {
    this.weekModalMode = 'edit';
    this.selectedWeek = week;
    this.formErrorMessage = '';
    this.weekForm.reset({
      weekStart: week.weekStart,
      weekEnd: week.weekEnd,
      status: week.status,
    });
    this.isWeekModalOpen = true;
  }

  submitWeek(): void {
    if (this.weekForm.invalid) {
      this.weekForm.markAllAsTouched();
      return;
    }

    const payload = this.weekForm.getRawValue();
    this.submitting = true;
    this.formErrorMessage = '';

    const request$ =
      this.weekModalMode === 'create' || !this.selectedWeek
        ? this.weeksApiService.createWeek(payload)
        : this.weeksApiService.updateWeekById(this.selectedWeek.weekId, payload);

    request$.pipe(finalize(() => (this.submitting = false))).subscribe({
      next: () => {
        this.isWeekModalOpen = false;
        this.loadWeeks(this.pageMetadata?.page ?? 0);
      },
      error: (error: unknown) => {
        this.formErrorMessage = this.errorMapper.getMessage(
          error,
          this.i18nService.translate('weeks.saveFailed'),
        );
      },
    });
  }

  openDeleteWeekModal(week: WeekSummary): void {
    this.selectedWeek = week;
    this.errorMessage = '';
    this.isDeleteModalOpen = true;
  }

  confirmDeleteWeek(): void {
    if (!this.selectedWeek) {
      return;
    }

    this.deleting = true;

    this.weeksApiService
      .deleteWeekById(this.selectedWeek.weekId)
      .pipe(finalize(() => (this.deleting = false)))
      .subscribe({
        next: () => {
          this.isDeleteModalOpen = false;
          this.loadWeeks(this.pageMetadata?.page ?? 0);
        },
        error: (error: unknown) => {
          this.errorMessage = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('weeks.deleteFailed'),
          );
        },
      });
  }

  openPlanning(week: WeekSummary): void {
    void this.router.navigate(['/weeks', week.weekId, 'planning']);
  }

  getWeekCode(week: WeekSummary): string {
    return generateWeekCode(week.weekStart);
  }

  getWeekRange(week: WeekSummary): string {
    return formatWeekRange(week.weekStart, week.weekEnd, this.i18nService.language());
  }
}
