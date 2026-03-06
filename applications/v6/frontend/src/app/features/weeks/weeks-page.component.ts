import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { WeekStatus, WeekSummary } from '../../core/models/api.models';
import { AuthStoreService } from '../../core/services/auth-store.service';
import { HttpErrorService } from '../../core/services/http-error.service';
import { computeWeekCode } from '../../core/utils/date.util';
import { TranslatePipe } from '../../shared/pipes/t.pipe';
import { ModalComponent } from '../../shared/ui/modal.component';
import { PaginationComponent } from '../../shared/ui/pagination.component';
import { LoadingSpinnerComponent } from '../../shared/ui/loading-spinner.component';
import { SelectComponent, SelectOption } from '../../shared/ui/select.component';
import { WeeksService } from './weeks.service';

type WeekModalMode = 'create' | 'edit' | 'duplicate';

@Component({
  selector: 'app-weeks-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    ModalComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
    SelectComponent,
  ],
  template: `
    <section class="page-section">
      <div class="page-toolbar">
        <button *ngIf="authStore.isAdmin()" type="button" class="gra-btn btn-primary" (click)="openCreateModal()">
          {{ 'app.createWeek' | t }}
        </button>

        <form [formGroup]="filterForm" class="toolbar-filters" (ngSubmit)="applyFilters()">
          <div class="gra-search-container">
            <input class="form form-control" formControlName="search" [placeholder]="'app.search' | t" />
          </div>
          <app-select [options]="weekStatusFilterOptions" formControlName="status"></app-select>
          <button type="submit" class="gra-btn btn-secondary">{{ 'app.search' | t }}</button>
        </form>
      </div>

      <div *ngIf="error()" class="gra-feedback-msg error gra-margin-bottom-s">
        <span class="text">{{ error() }}</span>
      </div>

      <div class="table-shell">
        <div *ngIf="loading()" class="table-loading">
          <app-loading-spinner size="medium"></app-loading-spinner>
        </div>

        <div class="gra-table-wrapper" *ngIf="!loading()">
          <table class="gra-table responsive-vertical">
            <thead>
              <tr>
                <th>{{ 'app.weekCode' | t }}</th>
                <th>{{ 'app.range' | t }}</th>
                <th>{{ 'app.status' | t }}</th>
                <th>{{ 'app.actions' | t }}</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let week of weeks()" (click)="openWeek(week)" class="table-row-clickable">
                <td data-header="Week Code">{{ week.code }}</td>
                <td data-header="Range">{{ week.weekStart }} to {{ week.weekEnd }}</td>
                <td data-header="Status">
                  <span class="gra-tag primary" [class.alert]="week.status === 'PLANNED'" [class.success]="week.status === 'COMPLETED'">
                    {{ ('enum.' + week.status) | t }}
                  </span>
                </td>
                <td data-header="Actions" class="options">
                  <button type="button" class="gra-btn btn-secondary action-btn" (click)="openWeek(week, $event)">
                    {{ 'app.open' | t }}
                  </button>
                  <button
                    *ngIf="authStore.isAdmin()"
                    type="button"
                    class="gra-btn btn-secondary action-btn"
                    (click)="openEditModal(week, $event)"
                  >
                    {{ 'app.edit' | t }}
                  </button>
                  <button
                    *ngIf="authStore.isAdmin()"
                    type="button"
                    class="gra-btn btn-secondary accent-warning action-btn"
                    (click)="openDuplicateModal(week, $event)"
                  >
                    {{ 'app.copy' | t }}
                  </button>
                  <button
                    *ngIf="authStore.isAdmin()"
                    type="button"
                    class="gra-btn btn-secondary-error action-btn"
                    (click)="openDeleteModal(week, $event)"
                  >
                    {{ 'app.delete' | t }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <app-pagination [page]="page()" (pageChange)="changePage($event)"></app-pagination>
      </div>
    </section>

    <app-modal [open]="weekModalOpen()" [title]="'app.createEditWeek' | t" (close)="closeWeekModal()">
      <form [formGroup]="weekForm" class="modal-form">
        <div class="modal-grid">
          <div class="field-group">
            <label for="week-start" class="required-label">{{ 'app.weekStart' | t }}</label>
            <div class="gra-daterangepicker-container">
              <input id="week-start" type="date" class="form form-control daterangepickerInput simpleDatePicker required-field" formControlName="weekStart" />
            </div>
            <div class="graRequiredField" *ngIf="hasControlError(weekForm, 'weekStart')">{{ 'app.required' | t }}</div>
          </div>

          <div class="field-group">
            <label for="week-end" class="required-label">{{ 'app.weekEnd' | t }}</label>
            <div class="gra-daterangepicker-container">
              <input id="week-end" type="date" class="form form-control daterangepickerInput simpleDatePicker required-field" formControlName="weekEnd" />
            </div>
            <div class="graRequiredField" *ngIf="hasControlError(weekForm, 'weekEnd') || weekForm.hasError('range')">
              {{ weekForm.hasError('range') ? ('app.weekRangeInvalid' | t) : ('app.required' | t) }}
            </div>
          </div>

          <div class="field-group">
            <label for="week-status" class="required-label">{{ 'app.status' | t }}</label>
            <app-select inputId="week-status" [options]="weekStatusOptions" formControlName="status"></app-select>
          </div>

          <div class="field-group preview-card">
            <span>{{ 'app.generatedWeekCode' | t }}</span>
            <strong>{{ weekCodePreview() || '-' }}</strong>
          </div>
        </div>

        <div *ngIf="formError()" class="gra-feedback-msg error">
          <span class="text">{{ formError() }}</span>
        </div>
      </form>

      <div modal-footer class="modal-actions">
        <button type="button" class="gra-btn btn-secondary" [disabled]="saving()" (click)="closeWeekModal()">
          {{ 'app.cancel' | t }}
        </button>
        <button type="button" class="gra-btn btn-primary" [disabled]="saving()" (click)="submitWeek()">
          {{ 'app.confirm' | t }}
        </button>
      </div>
    </app-modal>

    <app-modal [open]="deleteModalOpen()" [title]="'app.removeWeek' | t" (close)="closeDeleteModal()">
      <p>{{ 'app.removeWeek' | t }}</p>
      <div class="danger-card" *ngIf="selectedWeek() as week">
        <span>{{ 'app.week' | t }}</span>
        <strong>{{ week.code }}</strong>
      </div>
      <div *ngIf="deleteError()" class="gra-feedback-msg error">
        <span class="text">{{ deleteError() }}</span>
      </div>

      <div modal-footer class="modal-actions">
        <button type="button" class="gra-btn btn-secondary" [disabled]="saving()" (click)="closeDeleteModal()">
          {{ 'app.cancel' | t }}
        </button>
        <button type="button" class="gra-btn btn-primary-error" [disabled]="saving()" (click)="confirmDelete()">
          {{ 'app.confirm' | t }}
        </button>
      </div>
    </app-modal>
  `,
  styleUrl: './weeks-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeksPageComponent {
  protected readonly authStore = inject(AuthStoreService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly weeksService = inject(WeeksService);
  private readonly httpErrorService = inject(HttpErrorService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly formError = signal('');
  readonly deleteError = signal('');
  readonly weeks = signal<WeekSummary[]>([]);
  readonly page = signal<any | null>(null);
  readonly selectedWeek = signal<WeekSummary | null>(null);
  readonly weekModalOpen = signal(false);
  readonly deleteModalOpen = signal(false);
  readonly weekModalMode = signal<WeekModalMode>('create');

  readonly filterForm = this.formBuilder.group({
    search: [''],
    status: [''],
  });

  readonly weekForm = this.formBuilder.group(
    {
      weekStart: ['', [Validators.required]],
      weekEnd: ['', [Validators.required]],
      status: ['PLANNED', [Validators.required]],
    },
    {
      validators: (form) => {
        const weekStart = form.get('weekStart')?.value;
        const weekEnd = form.get('weekEnd')?.value;
        if (weekStart && weekEnd && weekStart > weekEnd) {
          return { range: true };
        }
        return null;
      },
    },
  );

  readonly weekCodePreview = computed(() => computeWeekCode(this.weekForm.get('weekStart')?.value ?? ''));
  readonly weekStatusFilterOptions: SelectOption[] = [
    { value: '', labelKey: 'app.status', placeholder: true },
    { value: 'PLANNED', labelKey: 'enum.PLANNED' },
    { value: 'COMPLETED', labelKey: 'enum.COMPLETED' },
  ];
  readonly weekStatusOptions: SelectOption[] = [
    { value: 'PLANNED', labelKey: 'enum.PLANNED' },
    { value: 'COMPLETED', labelKey: 'enum.COMPLETED' },
  ];

  constructor() {
    this.loadWeeks();
  }

  loadWeeks(pageIndex = 0): void {
    this.loading.set(true);
    this.error.set('');

    this.weeksService
      .listWeeks({
        page: pageIndex,
        size: 4,
        search: this.filterForm.get('search')?.value ?? '',
        status: (this.filterForm.get('status')?.value as WeekStatus | '') ?? '',
        sort: ['weekStart,asc'],
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.weeks.set(response.content);
          this.page.set(response.page);
        },
        error: (error) => {
          this.error.set(this.httpErrorService.parse(error).message);
        },
      });
  }

  applyFilters(): void {
    this.loadWeeks(0);
  }

  changePage(pageIndex: number): void {
    this.loadWeeks(pageIndex);
  }

  openWeek(week: WeekSummary, event?: Event): void {
    event?.stopPropagation();
    this.router.navigate(['/weeks', week.id, 'planning']);
  }

  openCreateModal(): void {
    this.weekModalMode.set('create');
    this.selectedWeek.set(null);
    this.weekForm.reset({
      weekStart: '',
      weekEnd: '',
      status: 'PLANNED',
    });
    this.formError.set('');
    this.weekModalOpen.set(true);
  }

  openEditModal(week: WeekSummary, event: Event): void {
    event.stopPropagation();
    this.weekModalMode.set('edit');
    this.selectedWeek.set(week);
    this.weekForm.reset({
      weekStart: week.weekStart,
      weekEnd: week.weekEnd,
      status: week.status,
    });
    this.formError.set('');
    this.weekModalOpen.set(true);
  }

  openDuplicateModal(week: WeekSummary, event: Event): void {
    event.stopPropagation();
    this.weekModalMode.set('duplicate');
    this.selectedWeek.set(week);
    this.weekForm.reset({
      weekStart: week.weekStart,
      weekEnd: week.weekEnd,
      status: 'PLANNED',
    });
    this.formError.set('');
    this.weekModalOpen.set(true);
  }

  closeWeekModal(): void {
    if (this.saving()) {
      return;
    }

    this.weekModalOpen.set(false);
    this.formError.set('');
  }

  submitWeek(): void {
    this.formError.set('');

    if (this.weekForm.invalid) {
      this.weekForm.markAllAsTouched();
      return;
    }

    const payload = {
      weekStart: this.weekForm.get('weekStart')?.value ?? '',
      weekEnd: this.weekForm.get('weekEnd')?.value ?? '',
      status: (this.weekForm.get('status')?.value as WeekStatus) ?? 'PLANNED',
    };

    this.saving.set(true);

    const mode = this.weekModalMode();
    const request$ =
      mode === 'edit' && this.selectedWeek()
        ? this.weeksService.updateWeek(this.selectedWeek()!.id, payload)
        : mode === 'duplicate' && this.selectedWeek()
          ? this.weeksService.duplicateWeek(this.selectedWeek()!.id, payload)
          : this.weeksService.createWeek(payload);

    request$
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.weekModalOpen.set(false);
          this.loadWeeks(this.page()?.page ?? 0);
        },
        error: (error) => {
          this.formError.set(this.httpErrorService.parse(error).message);
        },
      });
  }

  openDeleteModal(week: WeekSummary, event: Event): void {
    event.stopPropagation();
    this.selectedWeek.set(week);
    this.deleteError.set('');
    this.deleteModalOpen.set(true);
  }

  closeDeleteModal(): void {
    if (this.saving()) {
      return;
    }

    this.deleteModalOpen.set(false);
    this.deleteError.set('');
  }

  confirmDelete(): void {
    const week = this.selectedWeek();
    if (!week) {
      return;
    }

    this.saving.set(true);
    this.deleteError.set('');

    this.weeksService
      .deleteWeek(week.id)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.deleteModalOpen.set(false);
          this.loadWeeks(this.page()?.page ?? 0);
        },
        error: (error) => {
          this.deleteError.set(this.httpErrorService.parse(error).message);
        },
      });
  }

  hasControlError(form: UntypedFormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return Boolean(control && control.invalid && (control.touched || control.dirty));
  }
}
