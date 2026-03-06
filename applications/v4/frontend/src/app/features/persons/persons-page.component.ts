import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AccountRole, PersonStatus, PersonSummary } from '../../core/models/api.models';
import { PersonsApiService } from '../../core/services/api/persons-api.service';
import { AuthSessionStore } from '../../core/services/auth-session.store';
import { AuditLogService } from '../../core/services/audit-log.service';
import { ErrorMapperService, UiError } from '../../core/services/error-mapper.service';
import { ModalShellComponent } from '../../shared/components/modal-shell/modal-shell.component';
import {
  OptionDialogComponent,
  OptionItem
} from '../../shared/components/option-dialog/option-dialog.component';

@Component({
  selector: 'app-persons-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalShellComponent, OptionDialogComponent],
  templateUrl: './persons-page.component.html',
  styleUrl: './persons-page.component.scss'
})
export class PersonsPageComponent implements OnInit {
  readonly roleOptions: OptionItem<AccountRole>[] = [
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'VIEWER', value: 'VIEWER' }
  ];

  readonly statusOptions: OptionItem<PersonStatus>[] = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'INACTIVE', value: 'INACTIVE' }
  ];

  readonly personForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    password: ['', [Validators.minLength(8), Validators.maxLength(128)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
    role: ['VIEWER' as AccountRole, Validators.required],
    status: ['ACTIVE' as PersonStatus, Validators.required]
  });

  persons: PersonSummary[] = [];
  loading = false;
  error: UiError | null = null;

  formError: UiError | null = null;
  deleteError: UiError | null = null;

  isSaving = false;
  isDeleting = false;

  showFormModal = false;
  showDeleteModal = false;
  showRoleDialog = false;
  showStatusDialog = false;

  editingPerson: PersonSummary | null = null;
  deletingPerson: PersonSummary | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly personsApi: PersonsApiService,
    private readonly auth: AuthSessionStore,
    private readonly errorMapper: ErrorMapperService,
    private readonly auditLog: AuditLogService
  ) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  get isAdmin(): boolean {
    return this.auth.account?.role === 'ADMIN';
  }

  get selectedRole(): AccountRole {
    return this.personForm.controls.role.value;
  }

  get selectedStatus(): PersonStatus {
    return this.personForm.controls.status.value;
  }

  get isEditMode(): boolean {
    return !!this.editingPerson;
  }

  loadPersons(): void {
    this.loading = true;
    this.error = null;

    this.personsApi
      .listPersons({ page: 0, size: 100, sort: ['name,asc'] })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.persons = response.content;
        },
        error: (error) => {
          this.error = this.errorMapper.map(error);
        }
      });
  }

  openCreateModal(): void {
    this.editingPerson = null;
    this.formError = null;
    this.personForm.reset({
      name: '',
      password: '',
      email: '',
      role: 'VIEWER',
      status: 'ACTIVE'
    });
    this.personForm.controls.password.setValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(128)
    ]);
    this.personForm.controls.password.enable();
    this.personForm.controls.password.updateValueAndValidity();
    this.showRoleDialog = false;
    this.showStatusDialog = false;
    this.showFormModal = true;
  }

  openEditModal(person: PersonSummary): void {
    this.editingPerson = person;
    this.formError = null;
    this.personForm.reset({
      name: person.name,
      password: '',
      email: person.email,
      role: person.role,
      status: person.status
    });
    this.personForm.controls.password.clearValidators();
    this.personForm.controls.password.disable();
    this.personForm.controls.password.updateValueAndValidity();
    this.showRoleDialog = false;
    this.showStatusDialog = false;
    this.showFormModal = true;
  }

  openDeleteModal(person: PersonSummary): void {
    this.deletingPerson = person;
    this.deleteError = null;
    this.showDeleteModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deletingPerson = null;
  }

  setRole(role: AccountRole): void {
    this.personForm.controls.role.setValue(role);
    this.showRoleDialog = false;
  }

  setStatus(status: PersonStatus): void {
    this.personForm.controls.status.setValue(status);
    this.showStatusDialog = false;
  }

  savePerson(): void {
    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }

    this.formError = null;
    this.isSaving = true;

    const payloadBase = {
      name: this.personForm.controls.name.value,
      email: this.personForm.controls.email.value,
      role: this.personForm.controls.role.value,
      status: this.personForm.controls.status.value
    };

    const request$ = this.editingPerson
      ? this.personsApi.updatePersonById(this.editingPerson.personId, payloadBase)
      : this.personsApi.createPerson({
          ...payloadBase,
          password: this.personForm.controls.password.value,
          username: this.personForm.controls.email.value
        });

    request$.pipe(finalize(() => (this.isSaving = false))).subscribe({
      next: () => {
        this.auditLog.log('person_saved', { mode: this.editingPerson ? 'edit' : 'create' });
        this.showFormModal = false;
        this.loadPersons();
      },
      error: (error) => {
        this.formError = this.errorMapper.map(error);
      }
    });
  }

  deletePerson(): void {
    if (!this.deletingPerson) {
      return;
    }

    this.deleteError = null;
    this.isDeleting = true;

    this.personsApi
      .deletePersonById(this.deletingPerson.personId)
      .pipe(finalize(() => (this.isDeleting = false)))
      .subscribe({
        next: () => {
          this.auditLog.log('person_deleted', { personId: this.deletingPerson?.personId });
          this.closeDeleteModal();
          this.loadPersons();
        },
        error: (error) => {
          this.deleteError = this.errorMapper.map(error);
        }
      });
  }

  controlError(controlName: 'name' | 'password' | 'email'): string {
    const control = this.personForm.controls[controlName];
    if (!control.enabled) {
      return '';
    }
    if (!control.touched && !control.dirty) {
      return '';
    }

    if (control.errors?.['required']) {
      return 'Required field';
    }
    if (control.errors?.['email']) {
      return 'Invalid email';
    }
    if (control.errors?.['minlength']) {
      return `Minimum length ${control.errors['minlength'].requiredLength}`;
    }
    if (control.errors?.['maxlength']) {
      return `Maximum length ${control.errors['maxlength'].requiredLength}`;
    }

    return this.formError?.fieldErrors[controlName] ?? '';
  }
}
