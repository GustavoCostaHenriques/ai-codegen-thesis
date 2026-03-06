import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TopNavComponent } from '../../../shared/top-nav/top-nav.component';
import { User, UserCreateRequest, UserRole, UserStatus } from '../../models/api-models';
import { UsersApiService } from '../../services/users-api.service';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule, ReactiveFormsModule, TopNavComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly usersApi = inject(UsersApiService);
  private readonly route = inject(ActivatedRoute);

  users: User[] = [];
  errorMessage = '';

  modalOpen = false;
  deleteModalOpen = false;

  private editingUserId: string | null = null;
  private routeUserId: string | null = null;
  userToDelete: User | null = null;

  readonly userForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    role: ['USER' as UserRole, [Validators.required]],
    status: ['ACTIVE' as UserStatus, [Validators.required]],
  });

  ngOnInit(): void {
    this.loadUsers();

    this.route.paramMap.subscribe(params => {
      this.routeUserId = params.get('userId');
      this.openRouteUserIfPresent();
    });
  }

  loadUsers(): void {
    this.errorMessage = '';
    this.usersApi.listUsers(0, 200).subscribe({
      next: response => {
        this.users = response.items;
        this.openRouteUserIfPresent();
      },
      error: error => {
        this.errorMessage = error.message;
      },
    });
  }

  openCreateUserModal(): void {
    this.editingUserId = null;
    this.userForm.reset({
      name: '',
      email: '',
      role: 'USER',
      status: 'ACTIVE',
    });
    this.modalOpen = true;
  }

  openEditUserModal(user: User): void {
    this.editingUserId = user.id;
    this.userForm.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    this.modalOpen = true;
  }

  closeUserModal(): void {
    this.modalOpen = false;
    this.editingUserId = null;
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const payload: UserCreateRequest = this.userForm.getRawValue();

    if (this.editingUserId) {
      this.usersApi.updateUser(this.editingUserId, payload).subscribe({
        next: () => {
          this.closeUserModal();
          this.loadUsers();
        },
        error: error => {
          this.errorMessage = error.message;
        },
      });
      return;
    }

    this.usersApi.createUser(payload).subscribe({
      next: () => {
        this.closeUserModal();
        this.loadUsers();
      },
      error: error => {
        this.errorMessage = error.message;
      },
    });
  }

  openDeleteUserModal(user: User): void {
    this.userToDelete = user;
    this.deleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.deleteModalOpen = false;
    this.userToDelete = null;
  }

  deleteUser(): void {
    if (!this.userToDelete) {
      return;
    }

    this.usersApi.deleteUser(this.userToDelete.id).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.loadUsers();
      },
      error: error => {
        this.errorMessage = error.message;
      },
    });
  }

  private openRouteUserIfPresent(): void {
    if (!this.routeUserId || this.users.length === 0) {
      return;
    }

    const user = this.users.find(entry => entry.id === this.routeUserId);
    if (user) {
      this.openEditUserModal(user);
      this.routeUserId = null;
    }
  }
}
