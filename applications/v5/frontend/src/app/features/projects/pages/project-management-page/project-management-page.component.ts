import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ApiErrorService } from '../../../../core/services/api-error.service';
import { AuthStateService } from '../../../../core/services/auth-state.service';
import { EventLogService } from '../../../../core/services/event-log.service';
import { ProjectsApiService } from '../../../../core/services/api/projects-api.service';
import {
  Project,
  ProjectCreateRequest,
  ProjectStatus,
  ProjectSummary,
  ProjectUpdateRequest,
} from '../../../../shared/models/api.models';

@Component({
  selector: 'app-project-management-page',
  templateUrl: './project-management-page.component.html',
  styleUrl: './project-management-page.component.css',
  standalone: false,
})
export class ProjectManagementPageComponent implements OnInit, OnDestroy {
  projects: ProjectSummary[] = [];
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

  projectModalOpen = false;
  removeModalOpen = false;
  projectModalMode: 'create' | 'edit' = 'create';
  selectedProject: ProjectSummary | null = null;
  selectedProjectDetails: Project | null = null;

  private readonly destroy$ = new Subject<void>();
  private readonly formBuilder = inject(FormBuilder);

  readonly projectForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    code: ['', [Validators.required, Validators.maxLength(40)]],
    status: ['ACTIVE' as ProjectStatus, [Validators.required]],
  });

  constructor(
    private readonly projectsApiService: ProjectsApiService,
    private readonly apiErrorService: ApiErrorService,
    private readonly authStateService: AuthStateService,
    private readonly eventLogService: EventLogService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
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

  loadProjects(page = this.page): void {
    this.loading = true;
    this.errorMessage = '';
    this.page = page;

    this.projectsApiService
      .listProjects({
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
          this.projects = response.content;
          this.totalElements = response.page.totalElements;
          this.totalPages = response.page.totalPages;
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.errorMessage = parsedError.message;
          this.eventLogService.log('projects.list.error', parsedError);
        },
      });
  }

  searchProjects(): void {
    this.loadProjects(0);
  }

  openCreateModal(): void {
    this.projectModalMode = 'create';
    this.selectedProject = null;
    this.selectedProjectDetails = null;
    this.modalError = '';
    this.projectForm.reset({
      name: '',
      code: '',
      status: 'ACTIVE',
    });
    this.projectModalOpen = true;
  }

  openEditModal(project: ProjectSummary): void {
    this.projectModalMode = 'edit';
    this.selectedProject = project;
    this.selectedProjectDetails = null;
    this.modalError = '';
    this.modalLoading = true;
    this.projectModalOpen = true;

    this.projectsApiService
      .getProjectById(project.id)
      .pipe(
        finalize(() => {
          this.modalLoading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (details) => {
          this.selectedProjectDetails = details;
          this.projectForm.reset({
            name: details.name,
            code: details.code,
            status: details.status,
          });
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.modalError = parsedError.message;
        },
      });
  }

  closeProjectModal(): void {
    this.projectModalOpen = false;
  }

  saveProject(): void {
    this.modalError = '';
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    const payload: ProjectCreateRequest = {
      name: this.projectForm.controls.name.value ?? '',
      code: this.projectForm.controls.code.value ?? '',
      status: this.projectForm.controls.status.value ?? 'ACTIVE',
    };

    if (this.projectModalMode === 'create') {
      this.projectsApiService
        .createProject(payload)
        .pipe(
          finalize(() => {
            this.saving = false;
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: () => {
            this.projectModalOpen = false;
            this.loadProjects();
            this.eventLogService.log('projects.create.success', {
              code: payload.code,
            });
          },
          error: (error: unknown) => {
            const parsedError = this.apiErrorService.parse(error);
            this.modalError = parsedError.message;
          },
        });
      return;
    }

    if (!this.selectedProject) {
      this.saving = false;
      return;
    }

    const updatePayload: ProjectUpdateRequest = {
      name: payload.name,
      code: payload.code,
      status: payload.status,
    };

    this.projectsApiService
      .updateProject(this.selectedProject.id, updatePayload)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.projectModalOpen = false;
          this.loadProjects();
          this.eventLogService.log('projects.update.success', {
            projectId: this.selectedProject?.id,
          });
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.modalError = parsedError.message;
        },
      });
  }

  openRemoveModal(project: ProjectSummary): void {
    this.selectedProject = project;
    this.removeModalOpen = true;
    this.modalError = '';
  }

  closeRemoveModal(): void {
    this.removeModalOpen = false;
  }

  deleteProject(): void {
    if (!this.selectedProject) {
      return;
    }

    this.deleting = true;
    this.modalError = '';

    this.projectsApiService
      .deleteProject(this.selectedProject.id)
      .pipe(
        finalize(() => {
          this.deleting = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.removeModalOpen = false;
          this.loadProjects(
            this.page > 0 && this.projects.length === 1 ? this.page - 1 : this.page
          );
          this.eventLogService.log('projects.delete.success', {
            projectId: this.selectedProject?.id,
          });
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.modalError = parsedError.message;
        },
      });
  }
}
