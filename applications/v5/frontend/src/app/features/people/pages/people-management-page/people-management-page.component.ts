import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ApiErrorService } from '../../../../core/services/api-error.service';
import { AuthStateService } from '../../../../core/services/auth-state.service';
import { EventLogService } from '../../../../core/services/event-log.service';
import { PeopleApiService } from '../../../../core/services/api/people-api.service';
import {
  AccountRole,
  Person,
  PersonCreateRequest,
  PersonSummary,
  PersonUpdateRequest,
  PersonStatus,
} from '../../../../shared/models/api.models';

@Component({
  selector: 'app-people-management-page',
  templateUrl: './people-management-page.component.html',
  styleUrl: './people-management-page.component.css',
  standalone: false,
})
export class PeopleManagementPageComponent implements OnInit, OnDestroy {
  people: PersonSummary[] = [];
  loading = false;
  saving = false;
  deleting = false;
  modalLoading = false;
  errorMessage = '';
  modalError = '';
  search = '';

  page = 0;
  size = 10;
  totalElements = 0;
  totalPages = 0;

  personModalOpen = false;
  removeModalOpen = false;
  personModalMode: 'create' | 'edit' = 'create';
  selectedPerson: PersonSummary | null = null;
  selectedPersonDetails: Person | null = null;

  private readonly destroy$ = new Subject<void>();
  private readonly formBuilder = inject(FormBuilder);

  readonly personForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    username: ['', [Validators.required, Validators.maxLength(80)]],
    password: ['', [Validators.minLength(8), Validators.maxLength(200)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(160)]],
    role: ['VIEWER' as AccountRole, [Validators.required]],
    status: ['ACTIVE' as PersonStatus, [Validators.required]],
  });

  constructor(
    private readonly peopleApiService: PeopleApiService,
    private readonly apiErrorService: ApiErrorService,
    private readonly authStateService: AuthStateService,
    private readonly eventLogService: EventLogService
  ) {}

  ngOnInit(): void {
    this.loadPeople();
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

  loadPeople(page = this.page): void {
    this.loading = true;
    this.errorMessage = '';
    this.page = page;

    this.peopleApiService
      .listPeople({
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
          this.people = response.content;
          this.totalElements = response.page.totalElements;
          this.totalPages = response.page.totalPages;
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.errorMessage = parsedError.message;
          this.eventLogService.log('people.list.error', parsedError);
        },
      });
  }

  searchPeople(): void {
    this.loadPeople(0);
  }

  openCreateModal(): void {
    this.personModalMode = 'create';
    this.selectedPerson = null;
    this.selectedPersonDetails = null;
    this.modalError = '';
    this.personForm.reset({
      name: '',
      username: '',
      password: '',
      email: '',
      role: 'VIEWER',
      status: 'ACTIVE',
    });
    this.personForm.controls.password.setValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(200),
    ]);
    this.personForm.controls.password.updateValueAndValidity();
    this.personModalOpen = true;
  }

  openEditModal(person: PersonSummary): void {
    this.personModalMode = 'edit';
    this.selectedPerson = person;
    this.selectedPersonDetails = null;
    this.modalError = '';
    this.modalLoading = true;
    this.personModalOpen = true;

    this.personForm.controls.password.setValidators([
      Validators.minLength(8),
      Validators.maxLength(200),
    ]);
    this.personForm.controls.password.updateValueAndValidity();

    this.peopleApiService
      .getPersonById(person.id)
      .pipe(
        finalize(() => {
          this.modalLoading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (details) => {
          this.selectedPersonDetails = details;
          this.personForm.reset({
            name: details.name,
            username: details.username,
            password: '',
            email: details.email,
            role: details.role,
            status: details.status,
          });
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.modalError = parsedError.message;
        },
      });
  }

  closePersonModal(): void {
    this.personModalOpen = false;
  }

  savePerson(): void {
    this.modalError = '';
    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    const payload: PersonCreateRequest = {
      name: this.personForm.controls.name.value ?? '',
      username: this.personForm.controls.username.value ?? '',
      email: this.personForm.controls.email.value ?? '',
      password: this.personForm.controls.password.value ?? '',
      role: this.personForm.controls.role.value ?? 'VIEWER',
      status: this.personForm.controls.status.value ?? 'ACTIVE',
    };

    if (this.personModalMode === 'create') {
      this.peopleApiService
        .createPerson(payload)
        .pipe(
          finalize(() => {
            this.saving = false;
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: () => {
            this.personModalOpen = false;
            this.loadPeople();
            this.eventLogService.log('people.create.success', {
              username: payload.username,
            });
          },
          error: (error: unknown) => {
            const parsedError = this.apiErrorService.parse(error);
            this.modalError = parsedError.message;
          },
        });
      return;
    }

    if (!this.selectedPerson) {
      this.saving = false;
      return;
    }

    const updatePayload: PersonUpdateRequest = {
      name: payload.name,
      username: payload.username,
      email: payload.email,
      role: payload.role,
      status: payload.status,
      password: payload.password || undefined,
    };

    this.peopleApiService
      .updatePerson(this.selectedPerson.id, updatePayload)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.personModalOpen = false;
          this.loadPeople();
          this.eventLogService.log('people.update.success', {
            personId: this.selectedPerson?.id,
          });
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.modalError = parsedError.message;
        },
      });
  }

  openRemoveModal(person: PersonSummary): void {
    this.selectedPerson = person;
    this.removeModalOpen = true;
    this.modalError = '';
  }

  closeRemoveModal(): void {
    this.removeModalOpen = false;
  }

  deletePerson(): void {
    if (!this.selectedPerson) {
      return;
    }

    this.deleting = true;
    this.modalError = '';

    this.peopleApiService
      .deletePerson(this.selectedPerson.id)
      .pipe(
        finalize(() => {
          this.deleting = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.removeModalOpen = false;
          this.loadPeople(this.page > 0 && this.people.length === 1 ? this.page - 1 : this.page);
          this.eventLogService.log('people.delete.success', {
            personId: this.selectedPerson?.id,
          });
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.modalError = parsedError.message;
        },
      });
  }
}
