import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ProjectStatus, ProjectSummary } from '../../core/models/api.models';
import { ProjectsApiService } from '../../core/services/api/projects-api.service';
import { AuthSessionStore } from '../../core/services/auth-session.store';
import { AuditLogService } from '../../core/services/audit-log.service';
import { ErrorMapperService, UiError } from '../../core/services/error-mapper.service';
import { ModalShellComponent } from '../../shared/components/modal-shell/modal-shell.component';
import {
  OptionDialogComponent,
  OptionItem
} from '../../shared/components/option-dialog/option-dialog.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalShellComponent, OptionDialogComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss'
})
export class ProjectsPageComponent implements OnInit {
  readonly statusOptions: OptionItem<ProjectStatus>[] = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'INACTIVE', value: 'INACTIVE' }
  ];

  readonly projectForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    code: ['', [Validators.required, Validators.maxLength(40)]],
    status: ['ACTIVE' as ProjectStatus, Validators.required]
  });

  projects: ProjectSummary[] = [];
  loading = false;
  error: UiError | null = null;

  formError: UiError | null = null;
  deleteError: UiError | null = null;

  isSaving = false;
  isDeleting = false;

  showFormModal = false;
  showDeleteModal = false;
  showStatusDialog = false;

  editingProject: ProjectSummary | null = null;
  deletingProject: ProjectSummary | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly projectsApi: ProjectsApiService,
    private readonly auth: AuthSessionStore,
    private readonly errorMapper: ErrorMapperService,
    private readonly auditLog: AuditLogService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  get isAdmin(): boolean {
    return this.auth.account?.role === 'ADMIN';
  }

  get selectedStatus(): ProjectStatus {
    return this.projectForm.controls.status.value;
  }

  loadProjects(): void {
    this.loading = true;
    this.error = null;

    this.projectsApi
      .listProjects({ page: 0, size: 100, sort: ['name,asc'] })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.projects = response.content;
        },
        error: (error) => {
          this.error = this.errorMapper.map(error);
        }
      });
  }

  openCreateModal(): void {
    this.editingProject = null;
    this.formError = null;
    this.projectForm.reset({
      name: '',
      code: '',
      status: 'ACTIVE'
    });
    this.showStatusDialog = false;
    this.showFormModal = true;
  }

  openEditModal(project: ProjectSummary): void {
    this.editingProject = project;
    this.formError = null;
    this.projectForm.reset({
      name: project.name,
      code: project.code,
      status: project.status
    });
    this.showStatusDialog = false;
    this.showFormModal = true;
  }

  openDeleteModal(project: ProjectSummary): void {
    this.deletingProject = project;
    this.deleteError = null;
    this.showDeleteModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deletingProject = null;
  }

  setStatus(status: ProjectStatus): void {
    this.projectForm.controls.status.setValue(status);
    this.showStatusDialog = false;
  }

  saveProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.formError = null;
    this.isSaving = true;

    const payload = {
      name: this.projectForm.controls.name.value,
      code: this.projectForm.controls.code.value,
      status: this.projectForm.controls.status.value
    };

    const request$ = this.editingProject
      ? this.projectsApi.updateProjectById(this.editingProject.projectId, payload)
      : this.projectsApi.createProject(payload);

    request$.pipe(finalize(() => (this.isSaving = false))).subscribe({
      next: () => {
        this.auditLog.log('project_saved', { mode: this.editingProject ? 'edit' : 'create' });
        this.showFormModal = false;
        this.loadProjects();
      },
      error: (error) => {
        this.formError = this.errorMapper.map(error);
      }
    });
  }

  deleteProject(): void {
    if (!this.deletingProject) {
      return;
    }

    this.deleteError = null;
    this.isDeleting = true;

    this.projectsApi
      .deleteProjectById(this.deletingProject.projectId)
      .pipe(finalize(() => (this.isDeleting = false)))
      .subscribe({
        next: () => {
          this.auditLog.log('project_deleted', { projectId: this.deletingProject?.projectId });
          this.closeDeleteModal();
          this.loadProjects();
        },
        error: (error) => {
          this.deleteError = this.errorMapper.map(error);
        }
      });
  }

  controlError(controlName: 'name' | 'code'): string {
    const control = this.projectForm.controls[controlName];
    if (!control.touched && !control.dirty) {
      return '';
    }

    if (control.errors?.['required']) {
      return 'Required field';
    }
    if (control.errors?.['maxlength']) {
      return `Maximum length ${control.errors['maxlength'].requiredLength}`;
    }

    return this.formError?.fieldErrors[controlName] ?? '';
  }
}
