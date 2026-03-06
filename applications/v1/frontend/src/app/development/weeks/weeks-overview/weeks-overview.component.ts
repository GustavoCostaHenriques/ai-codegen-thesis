import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TopNavComponent } from '../../../shared/top-nav/top-nav.component';
import { WeekSummary, WeekUpdateRequest } from '../../models/api-models';
import { WeeksApiService } from '../../services/weeks-api.service';

@Component({
  selector: 'app-weeks-overview',
  imports: [CommonModule, ReactiveFormsModule, TopNavComponent],
  templateUrl: './weeks-overview.component.html',
  styleUrl: './weeks-overview.component.css',
})
export class WeeksOverviewComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly weeksApi = inject(WeeksApiService);
  private readonly router = inject(Router);

  weeks: WeekSummary[] = [];
  errorMessage = '';

  modalOpen = false;
  deleteModalOpen = false;

  private editingWeekId: string | null = null;
  weekToDelete: WeekSummary | null = null;

  readonly weekForm = this.formBuilder.nonNullable.group({
    label: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    status: ['DRAFT' as WeekSummary['status'], [Validators.required]],
  });

  get selectedWeekId(): string | null {
    return this.weeks[0]?.id ?? null;
  }

  ngOnInit(): void {
    this.loadWeeks();
  }

  loadWeeks(): void {
    this.errorMessage = '';
    this.weeksApi.listWeeks().subscribe({
      next: response => {
        this.weeks = response.items;
      },
      error: error => {
        this.errorMessage = error.message;
      },
    });
  }

  openCreateWeekModal(): void {
    this.editingWeekId = null;
    this.weekForm.reset({
      label: '',
      startDate: '',
      endDate: '',
      status: 'DRAFT',
    });
    this.modalOpen = true;
  }

  openEditWeekModal(week: WeekSummary): void {
    this.editingWeekId = week.id;
    this.weekForm.reset({
      label: week.label,
      startDate: week.startDate,
      endDate: week.endDate,
      status: week.status,
    });
    this.modalOpen = true;
  }

  closeWeekModal(): void {
    this.modalOpen = false;
    this.editingWeekId = null;
    this.weekForm.reset();
  }

  saveWeek(): void {
    if (this.weekForm.invalid) {
      this.weekForm.markAllAsTouched();
      return;
    }

    const payload: WeekUpdateRequest = this.weekForm.getRawValue();
    if (this.editingWeekId) {
      this.weeksApi.updateWeek(this.editingWeekId, payload).subscribe({
        next: () => {
          this.closeWeekModal();
          this.loadWeeks();
        },
        error: error => {
          this.errorMessage = error.message;
        },
      });
      return;
    }

    this.weeksApi.createWeek(payload).subscribe({
      next: () => {
        this.closeWeekModal();
        this.loadWeeks();
      },
      error: error => {
        this.errorMessage = error.message;
      },
    });
  }

  openWeek(week: WeekSummary): void {
    this.router.navigate(['/weeks', week.id, 'days']);
  }

  duplicateWeek(week: WeekSummary): void {
    this.weeksApi
      .duplicateWeek(week.id, {
        label: `${week.label} Copy`,
        startDate: week.startDate,
        endDate: week.endDate,
      })
      .subscribe({
        next: () => this.loadWeeks(),
        error: error => {
          this.errorMessage = error.message;
        },
      });
  }

  openDeleteWeekModal(week: WeekSummary): void {
    this.weekToDelete = week;
    this.deleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.deleteModalOpen = false;
    this.weekToDelete = null;
  }

  deleteWeek(): void {
    if (!this.weekToDelete) {
      return;
    }

    this.weeksApi.deleteWeek(this.weekToDelete.id).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.loadWeeks();
      },
      error: error => {
        this.errorMessage = error.message;
      },
    });
  }
}
