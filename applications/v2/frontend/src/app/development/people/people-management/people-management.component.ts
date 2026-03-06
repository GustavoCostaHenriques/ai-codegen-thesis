import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ModalShellComponent } from '../../../shared/modal-shell/modal-shell.component';
import { Person } from '../../models/person';
import { AuthService } from '../../services/auth.service';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-people-management',
  imports: [CommonModule, ReactiveFormsModule, ModalShellComponent],
  templateUrl: './people-management.component.html',
  styleUrl: './people-management.component.css',
})
export class PeopleManagementComponent implements OnInit {
  private readonly peopleService = inject(PeopleService);
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);

  readonly personForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', [Validators.required]],
    status: ['ACTIVE' as Person['status'], [Validators.required]],
  });

  people: Person[] = [];
  isLoading = false;
  isPersonModalOpen = false;
  isDeleteModalOpen = false;
  isSaving = false;
  isDeleting = false;
  submitted = false;
  editingPersonId: string | null = null;
  personPendingDeletion: Person | null = null;
  errorMessage = '';

  ngOnInit(): void {
    void this.loadPeople();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  openCreateModal(): void {
    this.editingPersonId = null;
    this.submitted = false;
    this.errorMessage = '';
    this.personForm.reset({
      name: '',
      email: '',
      role: '',
      status: 'ACTIVE',
    });
    this.isPersonModalOpen = true;
  }

  openEditModal(person: Person): void {
    this.editingPersonId = person.id;
    this.submitted = false;
    this.errorMessage = '';
    this.personForm.reset({
      name: person.name,
      email: person.email,
      role: person.role,
      status: person.status,
    });
    this.isPersonModalOpen = true;
  }

  closePersonModal(): void {
    this.isPersonModalOpen = false;
  }

  openDeleteModal(person: Person): void {
    this.personPendingDeletion = person;
    this.errorMessage = '';
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.personPendingDeletion = null;
  }

  async savePerson(): Promise<void> {
    this.submitted = true;
    this.errorMessage = '';

    if (this.personForm.invalid) {
      return;
    }

    this.isSaving = true;

    try {
      const request = {
        name: this.personForm.controls.name.value,
        email: this.personForm.controls.email.value,
        role: this.personForm.controls.role.value,
        status: this.personForm.controls.status.value,
      };

      if (this.editingPersonId) {
        await firstValueFrom(this.peopleService.updatePerson(this.editingPersonId, request));
      } else {
        await firstValueFrom(this.peopleService.createPerson(request));
      }

      this.closePersonModal();
      await this.loadPeople();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
    } finally {
      this.isSaving = false;
    }
  }

  async confirmDeletePerson(): Promise<void> {
    if (!this.personPendingDeletion) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';

    try {
      await firstValueFrom(this.peopleService.deletePerson(this.personPendingDeletion.id));
      this.closeDeleteModal();
      await this.loadPeople();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
    } finally {
      this.isDeleting = false;
    }
  }

  private async loadPeople(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = await firstValueFrom(this.peopleService.listPeople({ page: 0, size: 200 }));
      this.people = response.items;
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
      this.people = [];
    } finally {
      this.isLoading = false;
    }
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred.';
  }
}
