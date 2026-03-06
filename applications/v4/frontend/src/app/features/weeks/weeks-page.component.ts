import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { WeekStatus, WeekSummary } from '../../core/models/api.models';
import { AuthSessionStore } from '../../core/services/auth-session.store';
import { ErrorMapperService, UiError } from '../../core/services/error-mapper.service';
import { WeeksApiService } from '../../core/services/api/weeks-api.service';
import { AuditLogService } from '../../core/services/audit-log.service';
import { ModalShellComponent } from '../../shared/components/modal-shell/modal-shell.component';
import {
  OptionDialogComponent,
  OptionItem
} from '../../shared/components/option-dialog/option-dialog.component';

@Component({
  selector: 'app-weeks-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalShellComponent, OptionDialogComponent],
  templateUrl: './weeks-page.component.html',
  styleUrl: './weeks-page.component.scss'
})
export class WeeksPageComponent implements OnInit {
  readonly statusOptions: OptionItem<WeekStatus>[] = [
    { label: 'PLANNED', value: 'PLANNED' },
    { label: 'COMPLETED', value: 'COMPLETED' }
  ];

  readonly weekForm = this.fb.nonNullable.group(
    {
      weekStart: ['', Validators.required],
      weekEnd: ['', Validators.required],
      status: ['PLANNED' as WeekStatus, Validators.required]
    },
    { validators: [dateRangeValidator] }
  );

  weeks: WeekSummary[] = [];
  pageInfo = { page: 0, size: 20, totalElements: 0, totalPages: 0 };

  loading = false;
  error: UiError | null = null;

  formError: UiError | null = null;
  isSaving = false;
  isDeleting = false;

  showFormModal = false;
  showDeleteModal = false;
  showStatusDialog = false;

  editingWeek: WeekSummary | null = null;
  deletingWeek: WeekSummary | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly weeksApi: WeeksApiService,
    private readonly errorMapper: ErrorMapperService,
    private readonly router: Router,
    private readonly auth: AuthSessionStore,
    private readonly auditLog: AuditLogService
  ) {}

  ngOnInit(): void {
    this.loadWeeks();
  }

  get isAdmin(): boolean {
    return this.auth.account?.role === 'ADMIN';
  }

  get selectedStatus(): WeekStatus {
    return this.weekForm.controls.status.value;
  }

  loadWeeks(): void {
    this.loading = true;
    this.error = null;

    this.weeksApi
      .listWeeks({ page: 0, size: 50, sort: ['weekStart,asc'] })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.weeks = response.content;
          this.pageInfo = response.page;
        },
        error: (error) => {
          this.error = this.errorMapper.map(error);
        }
      });
  }

  openCreateModal(): void {
    this.editingWeek = null;
    this.formError = null;
    this.weekForm.reset({
      weekStart: '',
      weekEnd: '',
      status: 'PLANNED'
    });
    this.showStatusDialog = false;
    this.showFormModal = true;
  }

  openEditModal(week: WeekSummary, event?: Event): void {
    event?.stopPropagation();
    this.editingWeek = week;
    this.formError = null;
    this.weekForm.reset({
      weekStart: week.weekStart,
      weekEnd: week.weekEnd,
      status: week.status
    });
    this.showStatusDialog = false;
    this.showFormModal = true;
  }

  openDeleteModal(week: WeekSummary, event?: Event): void {
    event?.stopPropagation();
    this.deletingWeek = week;
    this.showDeleteModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deletingWeek = null;
  }

  setStatus(status: WeekStatus): void {
    this.weekForm.controls.status.setValue(status);
    this.showStatusDialog = false;
  }

  saveWeek(): void {
    if (this.weekForm.invalid) {
      this.weekForm.markAllAsTouched();
      return;
    }

    const payload = {
      weekStart: this.weekForm.controls.weekStart.value,
      weekEnd: this.weekForm.controls.weekEnd.value,
      status: this.weekForm.controls.status.value
    };

    this.formError = null;
    this.isSaving = true;

    const request$ = this.editingWeek
      ? this.weeksApi.updateWeekById(this.editingWeek.weekId, payload)
      : this.weeksApi.createWeek(payload);

    request$.pipe(finalize(() => (this.isSaving = false))).subscribe({
      next: () => {
        this.auditLog.log('week_saved', {
          mode: this.editingWeek ? 'edit' : 'create',
          weekStart: payload.weekStart,
          weekEnd: payload.weekEnd
        });
        this.showFormModal = false;
        this.loadWeeks();
      },
      error: (error) => {
        this.formError = this.errorMapper.map(error);
      }
    });
  }

  deleteWeek(): void {
    if (!this.deletingWeek) {
      return;
    }

    this.isDeleting = true;

    this.weeksApi
      .deleteWeekById(this.deletingWeek.weekId)
      .pipe(finalize(() => (this.isDeleting = false)))
      .subscribe({
        next: () => {
          this.auditLog.log('week_deleted', { weekId: this.deletingWeek?.weekId });
          this.closeDeleteModal();
          this.loadWeeks();
        },
        error: (error) => {
          this.formError = this.errorMapper.map(error);
        }
      });
  }

  openPlanning(weekId: string): void {
    this.router.navigate(['/weeks', weekId, 'planning']);
  }

  weekCode(week: WeekSummary): string {
    return toWeekCode(week.weekStart);
  }

  range(week: WeekSummary): string {
    return `${week.weekStart} to ${week.weekEnd}`;
  }

  controlError(controlName: 'weekStart' | 'weekEnd'): string {
    const control = this.weekForm.controls[controlName];
    if (!control.touched && !control.dirty) {
      return '';
    }

    if (control.errors?.['required']) {
      return 'Required field';
    }

    if (this.weekForm.errors?.['dateRange']) {
      return 'Week end must be after week start';
    }

    return this.formError?.fieldErrors[controlName] ?? '';
  }
}

function dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const weekStart = control.get('weekStart')?.value;
  const weekEnd = control.get('weekEnd')?.value;

  if (!weekStart || !weekEnd) {
    return null;
  }

  if (weekStart > weekEnd) {
    return { dateRange: true };
  }

  return null;
}

function toWeekCode(weekStart: string): string {
  const date = new Date(`${weekStart}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return weekStart;
  }

  const day = date.getDate();
  const weekIndex = Math.floor((day - 1) / 7) + 1;
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `W${weekIndex}${month}${year}`;
}
