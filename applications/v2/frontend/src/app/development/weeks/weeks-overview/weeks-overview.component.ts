import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ModalShellComponent } from '../../../shared/modal-shell/modal-shell.component';
import { Week } from '../../models/week';
import { AuthService } from '../../services/auth.service';
import { WeeksService } from '../../services/weeks.service';

@Component({
  selector: 'app-weeks-overview',
  imports: [CommonModule, ReactiveFormsModule, ModalShellComponent],
  templateUrl: './weeks-overview.component.html',
  styleUrl: './weeks-overview.component.css',
})
export class WeeksOverviewComponent implements OnInit {
  private readonly weeksService = inject(WeeksService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  readonly weekForm = this.formBuilder.nonNullable.group({
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    status: ['PLANNED' as Week['status'], [Validators.required]],
  });

  weeks: Week[] = [];
  isLoading = false;
  isWeekModalOpen = false;
  isDeleteModalOpen = false;
  isSavingWeek = false;
  isDeletingWeek = false;
  weekFormSubmitted = false;
  editingWeekId: string | null = null;
  weekPendingDeletion: Week | null = null;
  errorMessage = '';

  ngOnInit(): void {
    void this.loadWeeks();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get weekModalTitle(): string {
    return this.editingWeekId ? 'Create / Edit Week' : 'Create / Edit Week';
  }

  openWeek(week: Week): void {
    void this.router.navigate(['/weeks', week.id, 'planning']);
  }

  openCreateWeekModal(): void {
    this.editingWeekId = null;
    this.weekFormSubmitted = false;
    this.errorMessage = '';
    this.weekForm.reset({
      startDate: '',
      endDate: '',
      status: 'PLANNED',
    });
    this.isWeekModalOpen = true;
  }

  openEditWeekModal(week: Week): void {
    this.editingWeekId = week.id;
    this.weekFormSubmitted = false;
    this.errorMessage = '';
    this.weekForm.reset({
      startDate: week.startDate,
      endDate: week.endDate,
      status: week.status,
    });
    this.isWeekModalOpen = true;
  }

  closeWeekModal(): void {
    this.isWeekModalOpen = false;
  }

  openDeleteModal(week: Week): void {
    this.weekPendingDeletion = week;
    this.errorMessage = '';
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.weekPendingDeletion = null;
  }

  async saveWeek(): Promise<void> {
    this.weekFormSubmitted = true;
    this.errorMessage = '';

    if (this.weekForm.invalid) {
      return;
    }

    this.isSavingWeek = true;

    try {
      const request = {
        startDate: this.weekForm.controls.startDate.value,
        endDate: this.weekForm.controls.endDate.value,
        status: this.weekForm.controls.status.value,
      };

      if (this.editingWeekId) {
        await firstValueFrom(this.weeksService.updateWeek(this.editingWeekId, request));
      } else {
        await firstValueFrom(this.weeksService.createWeek(request));
      }

      this.closeWeekModal();
      await this.loadWeeks();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
    } finally {
      this.isSavingWeek = false;
    }
  }

  async confirmDeleteWeek(): Promise<void> {
    if (!this.weekPendingDeletion) {
      return;
    }

    this.isDeletingWeek = true;
    this.errorMessage = '';

    try {
      await firstValueFrom(this.weeksService.deleteWeek(this.weekPendingDeletion.id));
      this.closeDeleteModal();
      await this.loadWeeks();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
    } finally {
      this.isDeletingWeek = false;
    }
  }

  weekLabel(week: Week): string {
    const date = new Date(`${week.startDate}T00:00:00`);
    const year = date.getUTCFullYear();
    const weekNumber = this.isoWeekNumber(date);
    return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
  }

  private async loadWeeks(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = await firstValueFrom(this.weeksService.listWeeks({ page: 0, size: 200 }));
      this.weeks = response.items;
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
      this.weeks = [];
    } finally {
      this.isLoading = false;
    }
  }

  private isoWeekNumber(date: Date): number {
    const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    const dayNumber = utcDate.getUTCDay() || 7;
    utcDate.setUTCDate(utcDate.getUTCDate() + 4 - dayNumber);
    const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
    return Math.ceil((((utcDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred.';
  }
}
