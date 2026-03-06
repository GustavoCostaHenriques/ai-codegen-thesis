import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import {
  AccountRole,
  PageMetadata,
  PersonStatus,
  PersonSummary,
} from '../../../core/models/api.models';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PersonsApiService } from '../../../core/services/api/persons-api.service';
import { ErrorMapperService } from '../../../core/services/error-mapper.service';
import { SessionService } from '../../../core/services/session.service';
import { TopNavComponent } from '../../../shared/components/top-nav.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-person-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    TopNavComponent,
    ModalComponent,
    PaginationComponent,
  ],
  templateUrl: './person-management.component.html',
  styleUrls: ['./person-management.component.css'],
})
export class PersonManagementComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  readonly personForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['VIEWER' as AccountRole, [Validators.required]],
    status: ['ACTIVE' as PersonStatus, [Validators.required]],
  });

  readonly roleOptions: AccountRole[] = ['ADMIN', 'VIEWER'];
  readonly statusOptions: PersonStatus[] = ['ACTIVE', 'INACTIVE'];

  persons: PersonSummary[] = [];
  pageMetadata: PageMetadata | null = null;

  loading = false;
  submitting = false;
  deleting = false;

  pageSize = 10;
  errorMessage = '';
  formErrorMessage = '';

  isPersonModalOpen = false;
  isDeleteModalOpen = false;
  personModalMode: 'create' | 'edit' = 'create';
  selectedPerson: PersonSummary | null = null;

  constructor(
    private readonly personsApiService: PersonsApiService,
    private readonly sessionService: SessionService,
    private readonly errorMapper: ErrorMapperService,
    private readonly i18nService: I18nService,
  ) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  get canManagePersons(): boolean {
    return this.sessionService.isAdmin();
  }

  loadPersons(page: number = 0): void {
    this.loading = true;
    this.errorMessage = '';

    this.personsApiService
      .listPersons({
        page,
        size: this.pageSize,
        sort: ['name,asc'],
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.persons = response.content;
          this.pageMetadata = response.page;
        },
        error: (error: unknown) => {
          this.errorMessage = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('persons.loadFailed'),
          );
        },
      });
  }

  openCreateModal(): void {
    this.personModalMode = 'create';
    this.selectedPerson = null;
    this.formErrorMessage = '';
    this.personForm.controls.password.setValidators([Validators.required, Validators.minLength(8)]);
    this.personForm.controls.password.updateValueAndValidity();
    this.personForm.reset({
      name: '',
      email: '',
      password: '',
      role: 'VIEWER',
      status: 'ACTIVE',
    });
    this.isPersonModalOpen = true;
  }

  openEditModal(person: PersonSummary): void {
    this.personModalMode = 'edit';
    this.selectedPerson = person;
    this.formErrorMessage = '';
    this.personForm.controls.password.clearValidators();
    this.personForm.controls.password.updateValueAndValidity();
    this.personForm.reset({
      name: person.name,
      email: person.email,
      password: '',
      role: person.role,
      status: person.status,
    });
    this.isPersonModalOpen = true;
  }

  submitPerson(): void {
    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }

    const value = this.personForm.getRawValue();
    this.submitting = true;
    this.formErrorMessage = '';

    const request$ =
      this.personModalMode === 'create'
        ? this.personsApiService.createPerson({
            name: value.name,
            username: value.email,
            email: value.email,
            password: value.password,
            role: value.role,
            status: value.status,
          })
        : this.selectedPerson
          ? this.personsApiService.updatePersonById(this.selectedPerson.personId, {
              name: value.name,
              username: this.selectedPerson.username,
              email: value.email,
              role: value.role,
              status: value.status,
            })
          : null;

    if (!request$) {
      this.submitting = false;
      return;
    }

    request$.pipe(finalize(() => (this.submitting = false))).subscribe({
      next: () => {
        this.isPersonModalOpen = false;
        this.loadPersons(this.pageMetadata?.page ?? 0);
      },
      error: (error: unknown) => {
        this.formErrorMessage = this.errorMapper.getMessage(
          error,
          this.i18nService.translate('persons.saveFailed'),
        );
      },
    });
  }

  openDeleteModal(person: PersonSummary): void {
    this.selectedPerson = person;
    this.errorMessage = '';
    this.isDeleteModalOpen = true;
  }

  confirmDelete(): void {
    if (!this.selectedPerson) {
      return;
    }

    this.deleting = true;

    this.personsApiService
      .deletePersonById(this.selectedPerson.personId)
      .pipe(finalize(() => (this.deleting = false)))
      .subscribe({
        next: () => {
          this.isDeleteModalOpen = false;
          this.loadPersons(this.pageMetadata?.page ?? 0);
        },
        error: (error: unknown) => {
          this.errorMessage = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('persons.deleteFailed'),
          );
        },
      });
  }
}
