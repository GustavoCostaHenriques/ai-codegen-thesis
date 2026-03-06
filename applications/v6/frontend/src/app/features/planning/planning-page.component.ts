import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import {
  DayPlan,
  PageMetadata,
  PersonSummary,
  PlanningAssignment,
  ProjectSummary,
  Task,
  WeekPlanningBoard,
} from '../../core/models/api.models';
import { AuthStoreService } from '../../core/services/auth-store.service';
import { HttpErrorService } from '../../core/services/http-error.service';
import { dayIndex } from '../../core/utils/date.util';
import { TranslatePipe } from '../../shared/pipes/t.pipe';
import { LoadingSpinnerComponent } from '../../shared/ui/loading-spinner.component';
import { ModalComponent } from '../../shared/ui/modal.component';
import { PeopleService } from '../people/people.service';
import { PlanningService } from './planning.service';
import { ProjectsService } from '../projects/projects.service';

interface DisplayProject {
  project: ProjectSummary;
  assignments: PlanningAssignment[];
  persisted: boolean;
}

interface AssignmentContext {
  dayPlanId: string;
  date: string;
  project: ProjectSummary;
  persistedProject: boolean;
  person: PersonSummary;
}

interface TaskContext {
  dayPlanId: string;
  date: string;
  project: ProjectSummary;
  assignment: PlanningAssignment;
}

interface DeleteProjectContext {
  dayPlanId: string;
  project: ProjectSummary;
}

interface DeleteAssignmentContext {
  dayPlanId: string;
  date: string;
  project: ProjectSummary;
  assignment: PlanningAssignment;
}

@Component({
  selector: 'app-planning-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    LoadingSpinnerComponent,
    ModalComponent,
  ],
  template: `
    <section class="page-section">
      <div class="board-header" *ngIf="board() as currentBoard">
        <div>
          <h2>{{ currentBoard.week.code }}</h2>
          <p>{{ currentBoard.week.weekStart }} to {{ currentBoard.week.weekEnd }}</p>
        </div>
        <span class="gra-tag primary" [class.alert]="!currentBoard.readOnly" [class.success]="currentBoard.readOnly">
          {{ currentBoard.readOnly ? ('enum.COMPLETED' | t) : ('enum.PLANNED' | t) }}
        </span>
      </div>

      <div *ngIf="error()" class="gra-feedback-msg error gra-margin-bottom-s">
        <span class="text">{{ error() }}</span>
      </div>

      <div *ngIf="loading()" class="board-loading">
        <app-loading-spinner size="large"></app-loading-spinner>
      </div>

      <div *ngIf="!loading() && board() as currentBoard" class="planning-layout" [class.viewer-layout]="isReadOnlyMode()">
        <aside *ngIf="!authStore.isViewer()" class="sidebar-column">
          <section class="sidebar-panel">
            <h3>{{ 'app.activePersons' | t }}</h3>
            <div class="sidebar-panel-list">
              <button
                *ngFor="let person of activePeople()"
                type="button"
                class="sidebar-chip"
                [class.selected]="selectedPerson()?.id === person.id"
                draggable="true"
                (click)="selectPerson(person)"
                (dragstart)="onPersonDragStart(person, $event)"
                (dragend)="clearDragState()"
              >
                {{ person.name }}
              </button>
            </div>
          </section>

          <section class="sidebar-panel">
            <h3>{{ 'app.activeProjects' | t }}</h3>
            <div class="sidebar-panel-list">
              <button
                *ngFor="let project of activeProjects()"
                type="button"
                class="sidebar-chip project-chip"
                draggable="true"
                (dragstart)="onProjectDragStart(project, $event)"
                (dragend)="clearDragState()"
              >
                {{ project.name }}
              </button>
            </div>
          </section>
        </aside>

        <div class="board-scroll">
          <div class="days-row">
            <article
              *ngFor="let dayPlan of orderedDayPlans()"
              class="day-column"
              [class.drop-enabled]="canDropProjects()"
              (dragover)="allowDrop($event)"
              (drop)="dropProject(dayPlan, $event)"
            >
              <header class="day-header">
                <h3>{{ ('enum.' + dayPlan.dayOfWeek) | t }}</h3>
                <p>{{ dayPlan.date }}</p>
              </header>

              <section
                *ngFor="let project of displayedProjects(dayPlan)"
                class="project-card"
                [class.drop-enabled]="!isReadOnlyMode()"
                (dragover)="allowDrop($event)"
                (drop)="dropPerson(dayPlan, project, $event)"
              >
                <div class="project-card-header">
                  <div class="project-title" [class.assignable]="canAssignSelectedPerson()" (click)="assignSelectedPerson(dayPlan, project, $event)">
                    <strong>{{ project.project.name }}</strong>
                    <span>{{ project.project.code }}</span>
                  </div>
                  <button
                    *ngIf="authStore.isAdmin() && !isReadOnlyMode() && project.persisted"
                    type="button"
                    class="icon icon-secondary small-delete"
                    (click)="openDeleteProjectModal(dayPlan.id, project.project, $event)"
                  >
                    X
                  </button>
                </div>

                <div *ngFor="let assignment of project.assignments" class="assignment-chip">
                  <button type="button" class="assignment-open" (click)="openTasksModal(dayPlan.id, dayPlan.date, project.project, assignment)">
                    <span>{{ assignment.person.name }}</span>
                  </button>
                  <button
                    *ngIf="authStore.isAdmin() && !isReadOnlyMode()"
                    type="button"
                    class="icon icon-secondary small-delete"
                    (click)="openDeleteAssignmentModal(dayPlan.id, dayPlan.date, project.project, assignment, $event)"
                  >
                    X
                  </button>
                </div>

                <p *ngIf="project.assignments.length === 0" class="empty-state">{{ 'app.noAssignments' | t }}</p>
              </section>
            </article>
          </div>
        </div>
      </div>
    </section>

    <app-modal [open]="tasksModalOpen()" [title]="'app.tasks' | t" (close)="closeTasksModal()">
      <div *ngIf="taskContext() as context" class="modal-form">
        <div class="inline-context">
          <span>{{ context.project.name }}</span>
          <span>{{ context.assignment.person.name }}</span>
          <span>{{ context.date }}</span>
        </div>
        <p class="graInfoField">{{ 'app.modalTasksHint' | t }}</p>

        <form [formGroup]="taskForm" class="modal-form">
          <div class="modal-grid">
            <div class="field-group">
              <label>{{ 'app.estimatedHours' | t }}</label>
              <input
                type="number"
                min="0"
                step="0.5"
                class="form form-control"
                formControlName="estimatedHours"
                [readonly]="!canEditEstimatedHours()"
              />
            </div>
            <div class="field-group">
              <label>{{ 'app.actualHours' | t }}</label>
              <input
                type="number"
                min="0"
                step="0.5"
                class="form form-control"
                formControlName="actualHours"
                [readonly]="!canEditActualHours()"
              />
            </div>
          </div>

          <div formArrayName="tasks" class="tasks-list">
            <div *ngFor="let row of taskRows().controls; let index = index" [formGroupName]="index" class="task-row">
              <label>{{ 'app.taskDescription' | t }} {{ index + 1 }}</label>
              <textarea class="form form-control" rows="4" formControlName="description" [readonly]="!canEditTasks()"></textarea>
              <button
                *ngIf="canEditTasks() && taskRows().length > 1"
                type="button"
                class="gra-link remove-task-link"
                (click)="removeTaskRow(index)"
              >
                {{ 'app.delete' | t }}
              </button>
            </div>
          </div>

          <button *ngIf="canEditTasks()" type="button" class="gra-btn btn-secondary" (click)="addTaskRow()">
            {{ 'app.addTask' | t }}
          </button>
        </form>

        <div *ngIf="taskError()" class="gra-feedback-msg error">
          <span class="text">{{ taskError() }}</span>
        </div>
      </div>

      <div modal-footer class="modal-actions">
        <button type="button" class="gra-btn btn-secondary" [disabled]="modalSaving()" (click)="closeTasksModal()">
          {{ 'app.cancel' | t }}
        </button>
        <button *ngIf="canSubmitTaskChanges()" type="button" class="gra-btn btn-primary" [disabled]="modalSaving()" (click)="submitTaskChanges()">
          {{ 'app.confirm' | t }}
        </button>
      </div>
    </app-modal>

    <app-modal [open]="deleteProjectModalOpen()" [title]="'app.removeProject' | t" (close)="closeDeleteProjectModal()">
      <div class="danger-card" *ngIf="deleteProjectContext() as context">
        <span>{{ 'app.project' | t }}</span>
        <strong>{{ context.project.name }}</strong>
        <span>{{ context.project.code }}</span>
      </div>
      <div *ngIf="deleteError()" class="gra-feedback-msg error">
        <span class="text">{{ deleteError() }}</span>
      </div>
      <div modal-footer class="modal-actions">
        <button type="button" class="gra-btn btn-secondary" [disabled]="modalSaving()" (click)="closeDeleteProjectModal()">
          {{ 'app.cancel' | t }}
        </button>
        <button type="button" class="gra-btn btn-primary accent-danger" [disabled]="modalSaving()" (click)="confirmDeleteProject()">
          {{ 'app.confirm' | t }}
        </button>
      </div>
    </app-modal>

    <app-modal [open]="deleteAssignmentModalOpen()" [title]="'app.delete' | t" (close)="closeDeleteAssignmentModal()">
      <div class="danger-card" *ngIf="deleteAssignmentContext() as context">
        <span>{{ context.assignment.person.name }}</span>
        <strong>{{ context.project.name }}</strong>
        <span>{{ context.date }}</span>
      </div>
      <div *ngIf="deleteError()" class="gra-feedback-msg error">
        <span class="text">{{ deleteError() }}</span>
      </div>
      <div modal-footer class="modal-actions">
        <button type="button" class="gra-btn btn-secondary" [disabled]="modalSaving()" (click)="closeDeleteAssignmentModal()">
          {{ 'app.cancel' | t }}
        </button>
        <button type="button" class="gra-btn btn-primary accent-danger" [disabled]="modalSaving()" (click)="confirmDeleteAssignment()">
          {{ 'app.confirm' | t }}
        </button>
      </div>
    </app-modal>
  `,
  styleUrl: './planning-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanningPageComponent {
  protected readonly authStore = inject(AuthStoreService);
  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly planningService = inject(PlanningService);
  private readonly peopleService = inject(PeopleService);
  private readonly projectsService = inject(ProjectsService);
  private readonly httpErrorService = inject(HttpErrorService);

  readonly loading = signal(false);
  readonly modalSaving = signal(false);
  readonly error = signal('');
  readonly assignmentError = signal('');
  readonly taskError = signal('');
  readonly deleteError = signal('');
  readonly board = signal<WeekPlanningBoard | null>(null);
  readonly activePeople = signal<PersonSummary[]>([]);
  readonly activeProjects = signal<ProjectSummary[]>([]);
  readonly selectedPerson = signal<PersonSummary | null>(null);
  readonly assignmentModalOpen = signal(false);
  readonly tasksModalOpen = signal(false);
  readonly deleteProjectModalOpen = signal(false);
  readonly deleteAssignmentModalOpen = signal(false);
  readonly assignmentContext = signal<AssignmentContext | null>(null);
  readonly taskContext = signal<TaskContext | null>(null);
  readonly deleteProjectContext = signal<DeleteProjectContext | null>(null);
  readonly deleteAssignmentContext = signal<DeleteAssignmentContext | null>(null);
  readonly orderedDayPlans = computed(() => [...(this.board()?.dayPlans ?? [])].sort((left, right) => dayIndex(left.dayOfWeek) - dayIndex(right.dayOfWeek)));

  readonly assignmentForm: UntypedFormGroup = this.formBuilder.group({
    estimatedHours: [0, [Validators.required, Validators.min(0)]],
    actualHours: [null, [Validators.min(0)]],
    taskDescription: ['', [Validators.required, Validators.maxLength(2000)]],
  });

  readonly taskForm: UntypedFormGroup = this.formBuilder.group({
    estimatedHours: [0, [Validators.required, Validators.min(0)]],
    actualHours: [null, [Validators.min(0)]],
    tasks: this.formBuilder.array([]),
  });

  private readonly deletedTaskIds: string[] = [];
  private draggedPerson: PersonSummary | null = null;
  private draggedProject: ProjectSummary | null = null;
  private readonly weekId = this.route.snapshot.paramMap.get('weekId') ?? '';

  constructor() {
    this.loadBoard();
  }

  loadBoard(): void {
    this.loading.set(true);
    this.error.set('');

    if (this.authStore.isAdmin()) {
      forkJoin({
        board: this.planningService.getPlanningBoard(this.weekId),
        peoplePage: this.peopleService.listPeople({
          page: 0,
          size: 200,
          status: 'ACTIVE',
          sort: ['name,asc'],
        }),
        projectsPage: this.projectsService.listProjects({
          page: 0,
          size: 200,
          status: 'ACTIVE',
          sort: ['name,asc'],
        }),
      })
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: ({ board, peoplePage, projectsPage }) => {
            this.board.set(board);
            this.activePeople.set(peoplePage.content);
            this.activeProjects.set(projectsPage.content);
          },
          error: (error) => {
            this.error.set(this.httpErrorService.parse(error).message);
          },
        });
      return;
    }

    this.planningService
      .getPlanningBoard(this.weekId)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (board) => {
          this.board.set(board);
        },
        error: (error) => {
          this.error.set(this.httpErrorService.parse(error).message);
        },
      });
  }

  displayedProjects(dayPlan: DayPlan): DisplayProject[] {
    const viewerPersonId = this.authStore.user()?.personId ?? null;

    return dayPlan.projects
      .filter(
        (project) =>
          !this.authStore.isViewer() ||
          (viewerPersonId !== null && project.assignments.some((assignment) => assignment.person.id === viewerPersonId)),
      )
      .map((project) => ({
        project: project.project,
        assignments: project.assignments,
        persisted: true,
      }));
  }

  allowDrop(event: DragEvent): void {
    if (this.isReadOnlyMode()) {
      return;
    }

    event.preventDefault();
  }

  onPersonDragStart(person: PersonSummary, event: DragEvent): void {
    this.draggedPerson = person;
    this.draggedProject = null;
    event.dataTransfer?.setData('text/plain', person.id);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onProjectDragStart(project: ProjectSummary, event: DragEvent): void {
    this.draggedProject = project;
    this.draggedPerson = null;
    event.dataTransfer?.setData('text/plain', project.id);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  clearDragState(): void {
    this.draggedPerson = null;
    this.draggedProject = null;
  }

  selectPerson(person: PersonSummary): void {
    this.selectedPerson.set(this.selectedPerson()?.id === person.id ? null : person);
    this.draggedProject = null;
  }

  dropPerson(dayPlan: DayPlan, project: DisplayProject, event: DragEvent): void {
    if (this.isReadOnlyMode() || !this.draggedPerson) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    const person = this.draggedPerson;
    this.clearDragState();
    this.createAssignment(dayPlan, project, person);
  }

  dropProject(dayPlan: DayPlan, event: DragEvent): void {
    const draggedProject = this.draggedProject;
    if (this.isReadOnlyMode() || !draggedProject || !this.authStore.isAdmin()) {
      return;
    }

    event.preventDefault();

    const projectAlreadyExists = dayPlan.projects.some((project) => project.project.id === draggedProject.id);
    if (projectAlreadyExists) {
      this.clearDragState();
      return;
    }

    this.modalSaving.set(true);
    this.error.set('');

    this.planningService
      .ensureProjectOnDay(this.weekId, dayPlan.id, draggedProject.id)
      .pipe(finalize(() => this.modalSaving.set(false)))
      .subscribe({
        next: () => {
          this.clearDragState();
          this.loadBoard();
        },
        error: (error) => {
          this.error.set(this.httpErrorService.parse(error).message);
          this.clearDragState();
        },
      });
  }

  assignSelectedPerson(dayPlan: DayPlan, project: DisplayProject, event: Event): void {
    event.stopPropagation();
    const person = this.selectedPerson();
    if (!person || this.isReadOnlyMode()) {
      return;
    }

    this.createAssignment(dayPlan, project, person);
  }

  openTasksModal(dayPlanId: string, date: string, project: ProjectSummary, assignment: PlanningAssignment): void {
    this.taskContext.set({
      dayPlanId,
      date,
      project,
      assignment,
    });
    this.deletedTaskIds.length = 0;
    this.taskRows().clear();
    assignment.tasks.forEach((task) => this.taskRows().push(this.createTaskRow(task)));
    if (assignment.tasks.length === 0 && this.canEditTasks()) {
      this.addTaskRow();
    }

    this.taskForm.patchValue({
      estimatedHours: assignment.estimatedHours,
      actualHours: assignment.actualHours,
    });
    this.taskError.set('');
    this.tasksModalOpen.set(true);
  }

  closeTasksModal(): void {
    if (this.modalSaving()) {
      return;
    }

    this.tasksModalOpen.set(false);
    this.taskError.set('');
    this.taskContext.set(null);
    this.deletedTaskIds.length = 0;
    this.taskRows().clear();
  }

  addTaskRow(): void {
    this.taskRows().push(this.createTaskRow());
  }

  removeTaskRow(index: number): void {
    const row = this.taskRows().at(index) as UntypedFormGroup;
    const taskId = row.get('id')?.value;
    if (taskId) {
      this.deletedTaskIds.push(taskId);
    }
    this.taskRows().removeAt(index);
  }

  submitTaskChanges(): void {
    const context = this.taskContext();
    if (!context) {
      return;
    }

    const canEditTasks = this.canEditTasks();
    const canEditActualHours = this.canEditActualHours();
    if (!canEditTasks && !canEditActualHours) {
      return;
    }

    if ((canEditTasks && this.taskForm.invalid) || (canEditTasks && this.taskRows().length === 0)) {
      this.taskForm.markAllAsTouched();
      this.taskError.set('At least one task is required.');
      return;
    }

    this.modalSaving.set(true);
    this.taskError.set('');

    const operations: Observable<unknown>[] = [
      this.planningService.updateAssignment(this.weekId, context.dayPlanId, context.project.id, context.assignment.id, {
        estimatedHours: this.canEditEstimatedHours()
          ? Number(this.taskForm.get('estimatedHours')?.value ?? 0)
          : context.assignment.estimatedHours,
        actualHours: this.nullableNumber(this.taskForm.get('actualHours')?.value),
      }),
    ];

    if (canEditTasks) {
      this.taskRows().controls.forEach((control) => {
        const formGroup = control as UntypedFormGroup;
        const taskId = formGroup.get('id')?.value as string | null;
        const description = (formGroup.get('description')?.value ?? '').trim();
        const originalDescription = formGroup.get('originalDescription')?.value ?? '';

        if (!taskId) {
          operations.push(this.planningService.createTask(this.weekId, context.dayPlanId, context.project.id, context.assignment.id, { description }));
          return;
        }

        if (description !== originalDescription) {
          operations.push(
            this.planningService.updateTask(this.weekId, context.dayPlanId, context.project.id, context.assignment.id, taskId, {
              description,
            }),
          );
        }
      });

      this.deletedTaskIds.forEach((taskId) => {
        operations.push(this.planningService.deleteTask(this.weekId, context.dayPlanId, context.project.id, context.assignment.id, taskId));
      });
    }

    forkJoin(operations)
      .pipe(finalize(() => this.modalSaving.set(false)))
      .subscribe({
        next: () => {
          this.tasksModalOpen.set(false);
          this.taskContext.set(null);
          this.loadBoard();
        },
        error: (error) => {
          this.taskError.set(this.httpErrorService.parse(error).message);
        },
      });
  }

  openDeleteProjectModal(dayPlanId: string, project: ProjectSummary, event: Event): void {
    event.stopPropagation();
    this.deleteProjectContext.set({ dayPlanId, project });
    this.deleteError.set('');
    this.deleteProjectModalOpen.set(true);
  }

  closeDeleteProjectModal(): void {
    if (this.modalSaving()) {
      return;
    }

    this.deleteProjectContext.set(null);
    this.deleteError.set('');
    this.deleteProjectModalOpen.set(false);
  }

  confirmDeleteProject(): void {
    const context = this.deleteProjectContext();
    if (!context) {
      return;
    }

    this.modalSaving.set(true);
    this.planningService
      .deleteDayProject(this.weekId, context.dayPlanId, context.project.id)
      .pipe(finalize(() => this.modalSaving.set(false)))
      .subscribe({
        next: () => {
          this.deleteProjectModalOpen.set(false);
          this.deleteProjectContext.set(null);
          this.loadBoard();
        },
        error: (error) => {
          this.deleteError.set(this.httpErrorService.parse(error).message);
        },
      });
  }

  openDeleteAssignmentModal(dayPlanId: string, date: string, project: ProjectSummary, assignment: PlanningAssignment, event: Event): void {
    event.stopPropagation();
    this.deleteAssignmentContext.set({
      dayPlanId,
      date,
      project,
      assignment,
    });
    this.deleteError.set('');
    this.deleteAssignmentModalOpen.set(true);
  }

  closeDeleteAssignmentModal(): void {
    if (this.modalSaving()) {
      return;
    }

    this.deleteAssignmentContext.set(null);
    this.deleteError.set('');
    this.deleteAssignmentModalOpen.set(false);
  }

  confirmDeleteAssignment(): void {
    const context = this.deleteAssignmentContext();
    if (!context) {
      return;
    }

    this.modalSaving.set(true);
    this.planningService
      .deleteAssignment(this.weekId, context.dayPlanId, context.project.id, context.assignment.id)
      .pipe(finalize(() => this.modalSaving.set(false)))
      .subscribe({
        next: () => {
          this.deleteAssignmentModalOpen.set(false);
          this.deleteAssignmentContext.set(null);
          this.loadBoard();
        },
        error: (error) => {
          this.deleteError.set(this.httpErrorService.parse(error).message);
        },
      });
  }

  isReadOnlyMode(): boolean {
    return Boolean(this.board()?.readOnly) || this.authStore.isViewer();
  }

  isWeekReadOnly(): boolean {
    return Boolean(this.board()?.readOnly);
  }

  canDropProjects(): boolean {
    return this.authStore.isAdmin() && !this.isReadOnlyMode();
  }

  canAssignSelectedPerson(): boolean {
    return this.authStore.isAdmin() && !this.isReadOnlyMode() && this.selectedPerson() !== null;
  }

  canEditEstimatedHours(): boolean {
    return this.authStore.isAdmin() && !this.isWeekReadOnly();
  }

  canEditActualHours(): boolean {
    const context = this.taskContext();
    if (!context || this.isWeekReadOnly()) {
      return false;
    }

    return this.authStore.isAdmin() || context.assignment.person.id === this.authStore.user()?.personId;
  }

  canEditTasks(): boolean {
    return this.authStore.isAdmin() && !this.isWeekReadOnly();
  }

  canSubmitTaskChanges(): boolean {
    return this.canEditActualHours() || this.canEditTasks();
  }

  taskRows(): UntypedFormArray {
    return this.taskForm.get('tasks') as UntypedFormArray;
  }

  private createTaskRow(task?: Task): UntypedFormGroup {
    return this.formBuilder.group({
      id: [task?.id ?? null],
      description: [task?.description ?? '', [Validators.required, Validators.maxLength(2000)]],
      originalDescription: [task?.description ?? ''],
    });
  }

  private createAssignment(dayPlan: DayPlan, project: DisplayProject, person: PersonSummary): void {
    if (!project.persisted) {
      return;
    }

    this.modalSaving.set(true);
    this.assignmentError.set('');
    this.error.set('');

    this.planningService
      .createAssignment(this.weekId, dayPlan.id, project.project.id, {
        personId: person.id,
        estimatedHours: 0,
        actualHours: null,
        taskDescription: 'No tasks yet',
      })
      .pipe(finalize(() => this.modalSaving.set(false)))
      .subscribe({
        next: () => {
          this.selectedPerson.set(null);
          this.loadBoard();
        },
        error: (error) => {
          const message = this.httpErrorService.parse(error).message;
          this.assignmentError.set(message);
          this.error.set(message);
        },
      });
  }

  private nullableNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return Number(value);
  }
}
