import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ModalShellComponent } from '../../../shared/modal-shell/modal-shell.component';
import { Person } from '../../models/person';
import { Project } from '../../models/project';
import { AuthService } from '../../services/auth.service';
import { PeopleService } from '../../services/people.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-project-management',
  imports: [CommonModule, ReactiveFormsModule, ModalShellComponent],
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.css',
})
export class ProjectManagementComponent implements OnInit {
  private readonly projectsService = inject(ProjectsService);
  private readonly peopleService = inject(PeopleService);
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);

  readonly projectForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    ownerId: ['', [Validators.required]],
    status: ['ACTIVE' as Project['status'], [Validators.required]],
  });

  projects: Project[] = [];
  activePeople: Person[] = [];
  isLoading = false;
  isProjectModalOpen = false;
  isDeleteModalOpen = false;
  isSaving = false;
  isDeleting = false;
  submitted = false;
  editingProjectId: string | null = null;
  projectPendingDeletion: Project | null = null;
  errorMessage = '';

  ngOnInit(): void {
    void this.loadData();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  openCreateModal(): void {
    this.editingProjectId = null;
    this.submitted = false;
    this.errorMessage = '';
    this.projectForm.reset({
      name: '',
      code: '',
      ownerId: this.activePeople[0]?.id ?? '',
      status: 'ACTIVE',
    });
    this.isProjectModalOpen = true;
  }

  openEditModal(project: Project): void {
    this.editingProjectId = project.id;
    this.submitted = false;
    this.errorMessage = '';
    this.projectForm.reset({
      name: project.name,
      code: project.code,
      ownerId: project.owner.id,
      status: project.status,
    });
    this.isProjectModalOpen = true;
  }

  closeProjectModal(): void {
    this.isProjectModalOpen = false;
  }

  openDeleteModal(project: Project): void {
    this.projectPendingDeletion = project;
    this.errorMessage = '';
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.projectPendingDeletion = null;
  }

  async saveProject(): Promise<void> {
    this.submitted = true;
    this.errorMessage = '';

    if (this.projectForm.invalid) {
      return;
    }

    this.isSaving = true;

    try {
      const request = {
        name: this.projectForm.controls.name.value,
        code: this.projectForm.controls.code.value,
        ownerId: this.projectForm.controls.ownerId.value,
        status: this.projectForm.controls.status.value,
      };

      if (this.editingProjectId) {
        await firstValueFrom(this.projectsService.updateProject(this.editingProjectId, request));
      } else {
        await firstValueFrom(this.projectsService.createProject(request));
      }

      this.closeProjectModal();
      await this.loadData();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
    } finally {
      this.isSaving = false;
    }
  }

  async confirmDeleteProject(): Promise<void> {
    if (!this.projectPendingDeletion) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';

    try {
      await firstValueFrom(this.projectsService.deleteProject(this.projectPendingDeletion.id));
      this.closeDeleteModal();
      await this.loadData();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
    } finally {
      this.isDeleting = false;
    }
  }

  private async loadData(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const [projectsResponse, peopleResponse] = await Promise.all([
        firstValueFrom(this.projectsService.listProjects({ page: 0, size: 200 })),
        firstValueFrom(this.peopleService.listPeople({ page: 0, size: 200, status: 'ACTIVE' })),
      ]);

      this.projects = projectsResponse.items;
      this.activePeople = peopleResponse.items;
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
      this.projects = [];
      this.activePeople = [];
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
