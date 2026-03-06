import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AccountRole, PersonStatus, PersonSummary } from '../../core/models/api.models';
import { AuthStoreService } from '../../core/services/auth-store.service';
import { HttpErrorService } from '../../core/services/http-error.service';
import { TranslatePipe } from '../../shared/pipes/t.pipe';
import { LoadingSpinnerComponent } from '../../shared/ui/loading-spinner.component';
import { ModalComponent } from '../../shared/ui/modal.component';
import { PaginationComponent } from '../../shared/ui/pagination.component';
import { SelectComponent, SelectOption } from '../../shared/ui/select.component';
import { PeopleService } from './people.service';

type PersonModalMode = 'create' | 'edit';

@Component({
  selector: 'app-people-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    LoadingSpinnerComponent,
    ModalComponent,
    PaginationComponent,
    SelectComponent,
  ],
  template: `
    <section class="page-section">
      <div class="page-toolbar">
        <button *ngIf="authStore.isAdmin()" type="button" class="gra-btn btn-primary" (click)="openCreateModal()">
          {{ 'app.createPerson' | t }}
        </button>

        <form [formGroup]="filterForm" class="toolbar-filters" (ngSubmit)="loadPeople(0)">
          <div class="gra-search-container">
            <input class="form form-control" formControlName="search" [placeholder]="'app.search' | t" />
          </div>
          <app-select [options]="roleFilterOptions" formControlName="role"></app-select>
          <app-select [options]="personStatusFilterOptions" formControlName="status"></app-select>
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
                <th>{{ 'app.name' | t }}</th>
                <th>{{ 'app.email' | t }}</th>
                <th>{{ 'app.role' | t }}</th>
                <th>{{ 'app.status' | t }}</th>
                <th>{{ 'app.actions' | t }}</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let person of people()">
                <td data-header="Name">{{ person.name }}</td>
                <td data-header="Email">{{ person.email }}</td>
                <td data-header="Role">{{ ('enum.' + person.role) | t }}</td>
                <td data-header="Status">
                  <span class="gra-tag primary" [class.success]="person.status === 'ACTIVE'" [class.danger]="person.status === 'INACTIVE'">
                    {{ ('enum.' + person.status) | t }}
                  </span>
                </td>
                <td data-header="Actions" class="options">
                  <button
                    *ngIf="authStore.isAdmin()"
                    type="button"
                    class="gra-btn btn-secondary action-btn"
                    (click)="openEditModal(person)"
                  >
                    {{ 'app.edit' | t }}
                  </button>
                  <button
                    *ngIf="authStore.isAdmin()"
                    type="button"
                    class="gra-btn btn-secondary-error action-btn"
                    (click)="openDeleteModal(person)"
                  >
                    {{ 'app.delete' | t }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <app-pagination [page]="page()" (pageChange)="loadPeople($event)"></app-pagination>
      </div>
    </section>

    <app-modal [open]="personModalOpen()" [title]="'app.createEditPerson' | t" (close)="closePersonModal()">
      <form [formGroup]="personForm" class="modal-form">
        <div class="modal-grid">
          <div class="field-group">
            <label class="required-label">{{ 'app.name' | t }}</label>
            <input class="form form-control required-field" formControlName="name" />
            <div class="graRequiredField" *ngIf="hasControlError(personForm, 'name')">{{ 'app.required' | t }}</div>
          </div>

          <div class="field-group">
            <label class="required-label">{{ 'app.username' | t }}</label>
            <input class="form form-control required-field" formControlName="username" />
            <div class="graRequiredField" *ngIf="hasControlError(personForm, 'username')">{{ 'app.required' | t }}</div>
          </div>

          <div class="field-group">
            <label [class.required-label]="personModalMode() === 'create'">{{ 'app.password' | t }}</label>
            <div class="gra-password-container">
              <input type="password" class="form form-control" [class.required-field]="personModalMode() === 'create'" formControlName="password" />
            </div>
            <div class="graRequiredField" *ngIf="hasControlError(personForm, 'password')">
              {{ personModalMode() === 'edit' ? ('app.password' | t) : ('app.required' | t) }}
            </div>
          </div>

          <div class="field-group">
            <label class="required-label">{{ 'app.email' | t }}</label>
            <input class="form form-control required-field" formControlName="email" />
            <div class="graRequiredField" *ngIf="hasControlError(personForm, 'email')">
              {{ personForm.get('email')?.errors?.['email'] ? ('app.invalidEmail' | t) : ('app.required' | t) }}
            </div>
          </div>

          <div class="field-group">
            <label class="required-label">{{ 'app.role' | t }}</label>
            <app-select [options]="roleOptions" formControlName="role"></app-select>
          </div>

          <div class="field-group">
            <label class="required-label">{{ 'app.status' | t }}</label>
            <app-select [options]="personStatusOptions" formControlName="status"></app-select>
          </div>
        </div>

        <div *ngIf="formError()" class="gra-feedback-msg error">
          <span class="text">{{ formError() }}</span>
        </div>
      </form>

      <div modal-footer class="modal-actions">
        <button type="button" class="gra-btn btn-secondary" [disabled]="saving()" (click)="closePersonModal()">
          {{ 'app.cancel' | t }}
        </button>
        <button type="button" class="gra-btn btn-primary" [disabled]="saving()" (click)="submitPerson()">
          {{ 'app.confirm' | t }}
        </button>
      </div>
    </app-modal>

    <app-modal [open]="deleteModalOpen()" [title]="'app.removePerson' | t" (close)="closeDeleteModal()">
      <p>{{ 'app.removePerson' | t }}</p>
      <div class="danger-card" *ngIf="selectedPerson() as person">
        <span>{{ 'app.person' | t }}</span>
        <strong>{{ person.name }}</strong>
        <span>{{ person.email }}</span>
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
  styleUrl: './people-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeoplePageComponent {
  protected readonly authStore = inject(AuthStoreService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly peopleService = inject(PeopleService);
  private readonly httpErrorService = inject(HttpErrorService);

  readonly loading = signal(false);
  readonly modalLoading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly formError = signal('');
  readonly deleteError = signal('');
  readonly people = signal<PersonSummary[]>([]);
  readonly page = signal<any | null>(null);
  readonly selectedPerson = signal<PersonSummary | null>(null);
  readonly personModalOpen = signal(false);
  readonly deleteModalOpen = signal(false);
  readonly personModalMode = signal<PersonModalMode>('create');

  readonly filterForm = this.formBuilder.group({
    search: [''],
    role: [''],
    status: [''],
  });

  readonly personForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    username: ['', [Validators.required, Validators.maxLength(80)]],
    password: ['', [Validators.minLength(8), Validators.maxLength(200)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(160)]],
    role: ['VIEWER', [Validators.required]],
    status: ['ACTIVE', [Validators.required]],
  });
  readonly roleFilterOptions: SelectOption[] = [
    { value: '', labelKey: 'app.role', placeholder: true },
    { value: 'ADMIN', labelKey: 'enum.ADMIN' },
    { value: 'VIEWER', labelKey: 'enum.VIEWER' },
  ];
  readonly personStatusFilterOptions: SelectOption[] = [
    { value: '', labelKey: 'app.status', placeholder: true },
    { value: 'ACTIVE', labelKey: 'enum.ACTIVE' },
    { value: 'INACTIVE', labelKey: 'enum.INACTIVE' },
  ];
  readonly roleOptions: SelectOption[] = [
    { value: 'ADMIN', labelKey: 'enum.ADMIN' },
    { value: 'VIEWER', labelKey: 'enum.VIEWER' },
  ];
  readonly personStatusOptions: SelectOption[] = [
    { value: 'ACTIVE', labelKey: 'enum.ACTIVE' },
    { value: 'INACTIVE', labelKey: 'enum.INACTIVE' },
  ];

  constructor() {
    this.loadPeople();
  }

  loadPeople(pageIndex = 0): void {
    this.loading.set(true);
    this.error.set('');

    this.peopleService
      .listPeople({
        page: pageIndex,
        size: 4,
        search: this.filterForm.get('search')?.value ?? '',
        role: (this.filterForm.get('role')?.value as AccountRole | '') ?? '',
        status: (this.filterForm.get('status')?.value as PersonStatus | '') ?? '',
        sort: ['name,asc'],
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.people.set(response.content);
          this.page.set(response.page);
        },
        error: (error) => {
          this.error.set(this.httpErrorService.parse(error).message);
        },
      });
  }

  openCreateModal(): void {
    this.personModalMode.set('create');
    this.selectedPerson.set(null);
    this.personForm.reset({
      name: '',
      username: '',
      password: '',
      email: '',
      role: 'VIEWER',
      status: 'ACTIVE',
    });
    this.personForm.get('password')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(200)]);
    this.personForm.get('password')?.updateValueAndValidity();
    this.formError.set('');
    this.personModalOpen.set(true);
  }

  openEditModal(person: PersonSummary): void {
    this.personModalMode.set('edit');
    this.selectedPerson.set(person);
    this.personForm.reset({
      name: person.name,
      username: '',
      password: '',
      email: person.email,
      role: person.role,
      status: person.status,
    });
    this.modalLoading.set(true);
    this.peopleService
      .getPerson(person.id)
      .pipe(finalize(() => this.modalLoading.set(false)))
      .subscribe({
        next: (fullPerson) => {
          this.personForm.patchValue({
            username: fullPerson.username,
            name: fullPerson.name,
            email: fullPerson.email,
          });
        },
        error: (error) => {
          this.formError.set(this.httpErrorService.parse(error).message);
        },
      });
    this.personForm.get('password')?.setValidators([Validators.minLength(8), Validators.maxLength(200)]);
    this.personForm.get('password')?.updateValueAndValidity();
    this.formError.set('');
    this.personModalOpen.set(true);
  }

  closePersonModal(): void {
    if (this.saving()) {
      return;
    }

    this.personModalOpen.set(false);
    this.formError.set('');
  }

  submitPerson(): void {
    this.formError.set('');

    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }

    const mode = this.personModalMode();
    const password = this.personForm.get('password')?.value ?? '';
    const payload = {
      name: this.personForm.get('name')?.value ?? '',
      username: this.personForm.get('username')?.value ?? '',
      email: this.personForm.get('email')?.value ?? '',
      role: (this.personForm.get('role')?.value as AccountRole) ?? 'VIEWER',
      status: (this.personForm.get('status')?.value as PersonStatus) ?? 'ACTIVE',
      ...(password ? { password } : {}),
    };

    this.saving.set(true);

    const request$ =
      mode === 'edit' && this.selectedPerson()
        ? this.peopleService.updatePerson(this.selectedPerson()!.id, payload)
        : this.peopleService.createPerson({ ...payload, password });

    request$
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.personModalOpen.set(false);
          this.loadPeople(this.page()?.page ?? 0);
        },
        error: (error) => {
          this.formError.set(this.httpErrorService.parse(error).message);
        },
      });
  }

  openDeleteModal(person: PersonSummary): void {
    this.selectedPerson.set(person);
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
    const person = this.selectedPerson();
    if (!person) {
      return;
    }

    this.saving.set(true);
    this.peopleService
      .deletePerson(person.id)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.deleteModalOpen.set(false);
          this.loadPeople(this.page()?.page ?? 0);
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
