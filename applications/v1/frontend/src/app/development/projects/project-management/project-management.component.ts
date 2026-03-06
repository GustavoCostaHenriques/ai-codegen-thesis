import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TopNavComponent } from '../../../shared/top-nav/top-nav.component';
import {
  Project,
  ProjectCreateRequest,
  ProjectStatus,
  ProjectUpdateRequest,
} from '../../models/api-models';
import { ProjectsApiService } from '../../services/projects-api.service';

@Component({
  selector: 'app-project-management',
  imports: [CommonModule, ReactiveFormsModule, TopNavComponent],
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.css',
})
export class ProjectManagementComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly projectsApi = inject(ProjectsApiService);
  private readonly route = inject(ActivatedRoute);

  projects: Project[] = [];
  errorMessage = '';

  modalOpen = false;
  deleteModalOpen = false;

  private editingProjectId: string | null = null;
  private routeProjectId: string | null = null;
  projectToDelete: Project | null = null;

  readonly projectForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    status: ['ACTIVE' as ProjectStatus, [Validators.required]],
  });

  ngOnInit(): void {
    this.loadProjects();

    this.route.paramMap.subscribe(params => {
      this.routeProjectId = params.get('projectId');
      this.openRouteProjectIfPresent();
    });
  }

  loadProjects(): void {
    this.errorMessage = '';
    this.projectsApi.listProjects(0, 200).subscribe({
      next: response => {
        this.projects = response.items;
        this.openRouteProjectIfPresent();
      },
      error: error => {
        this.errorMessage = error.message;
      },
    });
  }

  openCreateProjectModal(): void {
    this.editingProjectId = null;
    this.projectForm.reset({
      name: '',
      code: '',
      status: 'ACTIVE',
    });
    this.modalOpen = true;
  }

  openEditProjectModal(project: Project): void {
    this.editingProjectId = project.id;
    this.projectForm.reset({
      name: project.name,
      code: project.code,
      status: project.status,
    });
    this.modalOpen = true;
  }

  closeProjectModal(): void {
    this.modalOpen = false;
    this.editingProjectId = null;
  }

  saveProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const payload = this.projectForm.getRawValue();

    if (this.editingProjectId) {
      const updatePayload: ProjectUpdateRequest = {
        name: payload.name,
        code: payload.code,
        status: payload.status,
      };

      this.projectsApi.updateProject(this.editingProjectId, updatePayload).subscribe({
        next: () => {
          this.closeProjectModal();
          this.loadProjects();
        },
        error: error => {
          this.errorMessage = error.message;
        },
      });
      return;
    }

    const createPayload: ProjectCreateRequest = {
      name: payload.name,
      code: payload.code,
      status: payload.status,
    };

    this.projectsApi.createProject(createPayload).subscribe({
      next: () => {
        this.closeProjectModal();
        this.loadProjects();
      },
      error: error => {
        this.errorMessage = error.message;
      },
    });
  }

  openDeleteProjectModal(project: Project): void {
    this.projectToDelete = project;
    this.deleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.deleteModalOpen = false;
    this.projectToDelete = null;
  }

  deleteProject(): void {
    if (!this.projectToDelete) {
      return;
    }

    this.projectsApi.deleteProject(this.projectToDelete.id).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.loadProjects();
      },
      error: error => {
        this.errorMessage = error.message;
      },
    });
  }

  private openRouteProjectIfPresent(): void {
    if (!this.routeProjectId || this.projects.length === 0) {
      return;
    }

    const project = this.projects.find(entry => entry.id === this.routeProjectId);
    if (project) {
      this.openEditProjectModal(project);
      this.routeProjectId = null;
    }
  }
}
