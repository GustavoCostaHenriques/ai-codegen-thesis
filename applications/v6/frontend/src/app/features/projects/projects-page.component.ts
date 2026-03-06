import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ProjectStatus, ProjectSummary } from '../../core/models/api.models';
import { AuthStoreService } from '../../core/services/auth-store.service';
import { HttpErrorService } from '../../core/services/http-error.service';
import { TranslatePipe } from '../../shared/pipes/t.pipe';
import { LoadingSpinnerComponent } from '../../shared/ui/loading-spinner.component';
import { ModalComponent } from '../../shared/ui/modal.component';
import { PaginationComponent } from '../../shared/ui/pagination.component';
import { SelectComponent, SelectOption } from '../../shared/ui/select.component';
import { ProjectsService } from './projects.service';

type ProjectModalMode = 'create' | 'edit';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    LoadingSpinnerComponent,
    ModalComponent,
    PaginationComponent,
    SelectComponent,
  ],
  template: `
    <section class="page-section">
      <div class="page-toolbar">
        <button *ngIf="authStore.isAdmin()" type="button" class="gra-btn btn-primary" (click)="openCreateModal()">
          {{ 'app.createProject' | t }}
        </button>

        <form [formGroup]="filterForm" class="toolbar-filters" (ngSubmit)="loadProjects(0)">
          <div class="gra-search-container">
            <input class="form form-control" formControlName="search" [placeholder]="'app.search' | t" />
          </div>
          <app-select [options]="projectStatusFilterOptions" formControlName="status"></app-select>
          <button type="submit" class="gra-btn btn-secondary">{{ 'app.search' | t }}</button>
        </form>
      </div>

      <div *ngIf="error()" class="gra-feedback-msg error gra-margin-bottom-s">
        <span class="text">{{ error() }}</span>
      </div>

      <div class="table-shell">
        <div *ngIf="loading()" class="table-loading">
          <app-loading-spinner size="medium"></app-loading-spinner>
        </div>

        <div class="gra-table-wrapper" *ngIf="!loading()">
          <table class="gra-table responsive-vertical">
            <thead>
              <tr>
                <th>{{ 'app.name' | t }}</th>
                <th>{{ 'app.projectCode' | t }}</th>
                <th>{{ 'app.status' | t }}</th>
                <th>{{ 'app.actions' | t }}</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let project of projects()">
                <td data-header="Name">{{ project.name }}</td>
                <td data-header="Code">{{ project.code }}</td>
                <td data-header="Status">
                  <span class="gra-tag primary" [class.success]="project.status === 'ACTIVE'" [class.danger]="project.status === 'INACTIVE'">
                    {{ ('enum.' + project.status) | t }}
                  </span>
                </td>
                <td data-header="Actions" class="options">
                  <button
                    *ngIf="authStore.isAdmin()"
                    type="button"
                    class="gra-btn btn-secondary action-btn"
                    (click)="openEditModal(project)"
                  >
                    {{ 'app.edit' | t }}
                  </button>
                  <button
                    *ngIf="authStore.isAdmin()"
                    type="button"
                    class="gra-btn btn-secondary-error action-btn"
                    (click)="openDeleteModal(project)"
                  >
                    {{ 'app.delete' | t }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <app-pagination [page]="page()" (pageChange)="loadProjects($event)"></app-pagination>
      </div>
    </section>

    <app-modal [open]="projectModalOpen()" [title]="'app.createEditProject' | t" (close)="closeProjectModal()">
      <form [formGroup]="projectForm" class="modal-form">
        <div class="modal-grid">
          <div class="field-group">
            <label class="required-label">{{ 'app.name' | t }}</label>
            <input class="form form-control required-field" formControlName="name" />
            <div class="graRequiredField" *ngIf="hasControlError(projectForm, 'name')">{{ 'app.required' | t }}</div>
          </div>

          <div class="field-group">
            <label class="required-label">{{ 'app.projectCode' | t }}</label>
            <input class="form form-control required-field" formControlName="code" />
            <div class="graRequiredField" *ngIf="hasControlError(projectForm, 'code')">{{ 'app.required' | t }}</div>
          </div>

          <div class="field-group">
            <label class="required-label">{{ 'app.status' | t }}</label>
            <app-select [options]="projectStatusOptions" formControlName="status"></app-select>
          </div>

          <div class="preview-card">
            <span>{{ 'app.details' | t }}</span>
            <strong>{{ 'app.projectDetails' | t }}</strong>
          </div>
        </div>

        <div *ngIf="formError()" class="gra-feedback-msg error">
          <span class="text">{{ formError() }}</span>
        </div>
      </form>

      <div modal-footer class="modal-actions">
        <button type="button" class="gra-btn btn-secondary" [disabled]="saving()" (click)="closeProjectModal()">
          {{ 'app.cancel' | t }}
        </button>
        <button type="button" class="gra-btn btn-primary" [disabled]="saving()" (click)="submitProject()">
          {{ 'app.confirm' | t }}
        </button>
      </div>
    </app-modal>

    <app-modal [open]="deleteModalOpen()" [title]="'app.removeProject' | t" (close)="closeDeleteModal()">
      <p>{{ 'app.removeProject' | t }}</p>
      <div class="danger-card" *ngIf="selectedProject() as project">
        <span>{{ 'app.project' | t }}</span>
        <strong>{{ project.name }}</strong>
        <span>{{ project.code }}</span>
      </div>
      <div *ngIf="deleteError()" class="gra-feedback-msg error">
        <span class="text">{{ deleteError() }}</span>
      </div>

      <div modal-footer class="modal-actions">
        <button type="button" class="gra-btn btn-secondary" [disabled]="saving()" (click)="closeDeleteModal()">
          {{ 'app.cancel' | t }}
        </button>
        <button type="button" class="gra-btn btn-primary-error" [disabled]="saving()" (click)="confirmDelete()">
          {{ 'app.confirm' | t }}
        </button>
      </div>
    </app-modal>
  `,
  styleUrl: './projects-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent {
  protected readonly authStore = inject(AuthStoreService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly projectsService = inject(ProjectsService);
  private readonly httpErrorService = inject(HttpErrorService);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly formError = signal('');
  readonly deleteError = signal('');
  readonly projects = signal<ProjectSummary[]>([]);
  readonly page = signal<any | null>(null);
  readonly selectedProject = signal<ProjectSummary | null>(null);
  readonly projectModalOpen = signal(false);
  readonly deleteModalOpen = signal(false);
  readonly projectModalMode = signal<ProjectModalMode>('create');

  readonly filterForm = this.formBuilder.group({
    search: [''],
    status: [''],
  });

  readonly projectForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    code: ['', [Validators.required, Validators.maxLength(40)]],
    status: ['ACTIVE', [Validators.required]],
  });
  readonly projectStatusFilterOptions: SelectOption[] = [
    { value: '', labelKey: 'app.status', placeholder: true },
    { value: 'ACTIVE', labelKey: 'enum.ACTIVE' },
    { value: 'INACTIVE', labelKey: 'enum.INACTIVE' },
  ];
  readonly projectStatusOptions: SelectOption[] = [
    { value: 'ACTIVE', labelKey: 'enum.ACTIVE' },
    { value: 'INACTIVE', labelKey: 'enum.INACTIVE' },
  ];

  constructor() {
    this.loadProjects();
  }

  loadProjects(pageIndex = 0): void {
    this.loading.set(true);
    this.error.set('');

    this.projectsService
      .listProjects({
        page: pageIndex,
        size: 4,
        search: this.filterForm.get('search')?.value ?? '',
        status: (this.filterForm.get('status')?.value as ProjectStatus | '') ?? '',
        sort: ['name,asc'],
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.projects.set(response.content);
          this.page.set(response.page);
        },
        error: (error) => {
          this.error.set(this.httpErrorService.parse(error).message);
        },
      });
  }

  openCreateModal(): void {
    this.projectModalMode.set('create');
    this.selectedProject.set(null);
    this.projectForm.reset({
      name: '',
      code: '',
      status: 'ACTIVE',
    });
    this.formError.set('');
    this.projectModalOpen.set(true);
  }

  openEditModal(project: ProjectSummary): void {
    this.projectModalMode.set('edit');
    this.selectedProject.set(project);
    this.projectForm.reset({
      name: project.name,
      code: project.code,
      status: project.status,
    });
    this.formError.set('');
    this.projectModalOpen.set(true);
  }

  closeProjectModal(): void {
    if (this.saving()) {
      return;
    }

    this.projectModalOpen.set(false);
    this.formError.set('');
  }

  submitProject(): void {
    this.formError.set('');

    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.projectForm.get('name')?.value ?? '',
      code: this.projectForm.get('code')?.value ?? '',
      status: (this.projectForm.get('status')?.value as ProjectStatus) ?? 'ACTIVE',
    };

    this.saving.set(true);

    const request$ =
      this.projectModalMode() === 'edit' && this.selectedProject()
        ? this.projectsService.updateProject(this.selectedProject()!.id, payload)
        : this.projectsService.createProject(payload);

    request$
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.projectModalOpen.set(false);
          this.loadProjects(this.page()?.page ?? 0);
        },
        error: (error) => {
          this.formError.set(this.httpErrorService.parse(error).message);
        },
      });
  }

  openDeleteModal(project: ProjectSummary): void {
    this.selectedProject.set(project);
    this.deleteError.set('');
    this.deleteModalOpen.set(true);
  }

  closeDeleteModal(): void {
    if (this.saving()) {
      return;
    }

    this.deleteModalOpen.set(false);
    this.deleteError.set('');
  }

  confirmDelete(): void {
    const project = this.selectedProject();
    if (!project) {
      return;
    }

    this.saving.set(true);
    this.projectsService
      .deleteProject(project.id)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.deleteModalOpen.set(false);
          this.loadProjects(this.page()?.page ?? 0);
        },
        error: (error) => {
          this.deleteError.set(this.httpErrorService.parse(error).message);
        },
      });
  }

  hasControlError(form: UntypedFormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return Boolean(control && control.invalid && (control.touched || control.dirty));
  }
}
