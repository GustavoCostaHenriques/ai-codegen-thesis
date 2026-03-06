import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import {
  PageMetadata,
  ProjectStatus,
  ProjectSummary,
} from '../../../core/models/api.models';
import { I18nService } from '../../../core/i18n/i18n.service';
import { ProjectsApiService } from '../../../core/services/api/projects-api.service';
import { ErrorMapperService } from '../../../core/services/error-mapper.service';
import { SessionService } from '../../../core/services/session.service';
import { TopNavComponent } from '../../../shared/components/top-nav.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    TopNavComponent,
    ModalComponent,
    PaginationComponent,
  ],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  readonly projectForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    status: ['ACTIVE' as ProjectStatus, [Validators.required]],
  });

  readonly statusOptions: ProjectStatus[] = ['ACTIVE', 'INACTIVE'];

  projects: ProjectSummary[] = [];
  pageMetadata: PageMetadata | null = null;

  loading = false;
  submitting = false;
  deleting = false;

  pageSize = 10;
  errorMessage = '';
  formErrorMessage = '';

  isProjectModalOpen = false;
  isDeleteModalOpen = false;
  projectModalMode: 'create' | 'edit' = 'create';
  selectedProject: ProjectSummary | null = null;

  constructor(
    private readonly projectsApiService: ProjectsApiService,
    private readonly sessionService: SessionService,
    private readonly errorMapper: ErrorMapperService,
    private readonly i18nService: I18nService,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  get canManageProjects(): boolean {
    return this.sessionService.isAdmin();
  }

  loadProjects(page: number = 0): void {
    this.loading = true;
    this.errorMessage = '';

    this.projectsApiService
      .listProjects({
        page,
        size: this.pageSize,
        sort: ['name,asc'],
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.projects = response.content;
          this.pageMetadata = response.page;
        },
        error: (error: unknown) => {
          this.errorMessage = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('projects.loadFailed'),
          );
        },
      });
  }

  openCreateModal(): void {
    this.projectModalMode = 'create';
    this.selectedProject = null;
    this.formErrorMessage = '';
    this.projectForm.reset({
      name: '',
      code: '',
      status: 'ACTIVE',
    });
    this.isProjectModalOpen = true;
  }

  openEditModal(project: ProjectSummary): void {
    this.projectModalMode = 'edit';
    this.selectedProject = project;
    this.formErrorMessage = '';
    this.projectForm.reset({
      name: project.name,
      code: project.code,
      status: project.status,
    });
    this.isProjectModalOpen = true;
  }

  submitProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const payload = this.projectForm.getRawValue();
    this.submitting = true;
    this.formErrorMessage = '';

    const request$ =
      this.projectModalMode === 'create'
        ? this.projectsApiService.createProject(payload)
        : this.selectedProject
          ? this.projectsApiService.updateProjectById(this.selectedProject.projectId, payload)
          : null;

    if (!request$) {
      this.submitting = false;
      return;
    }

    request$.pipe(finalize(() => (this.submitting = false))).subscribe({
      next: () => {
        this.isProjectModalOpen = false;
        this.loadProjects(this.pageMetadata?.page ?? 0);
      },
      error: (error: unknown) => {
        this.formErrorMessage = this.errorMapper.getMessage(
          error,
          this.i18nService.translate('projects.saveFailed'),
        );
      },
    });
  }

  openDeleteModal(project: ProjectSummary): void {
    this.selectedProject = project;
    this.errorMessage = '';
    this.isDeleteModalOpen = true;
  }

  confirmDelete(): void {
    if (!this.selectedProject) {
      return;
    }

    this.deleting = true;

    this.projectsApiService
      .deleteProjectById(this.selectedProject.projectId)
      .pipe(finalize(() => (this.deleting = false)))
      .subscribe({
        next: () => {
          this.isDeleteModalOpen = false;
          this.loadProjects(this.pageMetadata?.page ?? 0);
        },
        error: (error: unknown) => {
          this.errorMessage = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('projects.deleteFailed'),
          );
        },
      });
  }
}
