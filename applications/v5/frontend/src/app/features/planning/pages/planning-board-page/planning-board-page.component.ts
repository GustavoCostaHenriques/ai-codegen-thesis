import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of, Subject, takeUntil, finalize } from 'rxjs';
import { ApiErrorService } from '../../../../core/services/api-error.service';
import { AuthStateService } from '../../../../core/services/auth-state.service';
import { EventLogService } from '../../../../core/services/event-log.service';
import { PeopleApiService } from '../../../../core/services/api/people-api.service';
import { PlanningApiService } from '../../../../core/services/api/planning-api.service';
import { ProjectsApiService } from '../../../../core/services/api/projects-api.service';
import {
  AssignmentCreateRequest,
  AssignmentUpdateRequest,
  DayPlan,
  DayProject,
  PersonSummary,
  PlanningAssignment,
  ProjectSummary,
  Task,
  TaskCreateRequest,
  TaskUpdateRequest,
  WeekPlanningBoard,
} from '../../../../shared/models/api.models';

interface AssignmentTarget {
  dayPlanId: string;
  projectId: string;
  person: PersonSummary;
}

interface HoursTarget {
  dayPlanId: string;
  projectId: string;
  assignmentId: string;
}

interface TaskTarget {
  dayPlanId: string;
  projectId: string;
  assignmentId: string;
  taskId?: string;
}

interface ProjectRemovalTarget {
  dayPlanId: string;
  projectId: string;
  projectName: string;
}

@Component({
  selector: 'app-planning-board-page',
  templateUrl: './planning-board-page.component.html',
  styleUrl: './planning-board-page.component.css',
  standalone: false,
})
export class PlanningBoardPageComponent implements OnInit, OnDestroy {
  weekId = '';
  board: WeekPlanningBoard | null = null;
  loading = false;
  refreshing = false;
  errorMessage = '';
  modalError = '';

  activePeople: PersonSummary[] = [];
  activeProjects: ProjectSummary[] = [];
  dayProjectSelections: Record<string, string> = {};
  draggedPerson: PersonSummary | null = null;

  assignmentModalOpen = false;
  savingAssignment = false;
  assignmentTarget: AssignmentTarget | null = null;

  hoursModalOpen = false;
  savingHours = false;
  hoursTarget: HoursTarget | null = null;

  taskModalOpen = false;
  savingTask = false;
  deletingTask = false;
  taskTarget: TaskTarget | null = null;

  removeProjectModalOpen = false;
  deletingProject = false;
  projectRemovalTarget: ProjectRemovalTarget | null = null;

  private readonly destroy$ = new Subject<void>();
  private readonly formBuilder = inject(FormBuilder);

  readonly assignmentForm = this.formBuilder.group({
    estimatedHours: [0, [Validators.required, Validators.min(0)]],
    actualHours: [null as number | null, [Validators.min(0)]],
    taskDescription: ['', [Validators.required, Validators.maxLength(2000)]],
  });

  readonly hoursForm = this.formBuilder.group({
    estimatedHours: [0, [Validators.required, Validators.min(0)]],
    actualHours: [null as number | null, [Validators.min(0)]],
  });

  readonly taskForm = this.formBuilder.group({
    description: ['', [Validators.required, Validators.maxLength(2000)]],
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly planningApiService: PlanningApiService,
    private readonly peopleApiService: PeopleApiService,
    private readonly projectsApiService: ProjectsApiService,
    private readonly authStateService: AuthStateService,
    private readonly apiErrorService: ApiErrorService,
    private readonly eventLogService: EventLogService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const weekId = params.get('weekId');
      if (!weekId) {
        return;
      }
      this.weekId = weekId;
      this.loadPlanningData();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isAdmin(): boolean {
    return this.authStateService.isAdmin();
  }

  get canEditPlanning(): boolean {
    return this.isAdmin && !!this.board && !this.board.readOnly;
  }

  get dayPlans(): DayPlan[] {
    return this.board?.dayPlans ?? [];
  }

  get currentUserPersonId(): string | null {
    return this.authStateService.getCurrentUser()?.personId ?? null;
  }

  loadPlanningData(): void {
    this.loading = true;
    this.errorMessage = '';

    const boardRequest = this.planningApiService.getWeekPlanningBoard(this.weekId);
    const peopleRequest = this.isAdmin
      ? this.peopleApiService.listPeople({
          status: 'ACTIVE',
          page: 0,
          size: 200,
        })
      : of(null);
    const projectsRequest = this.isAdmin
      ? this.projectsApiService.listProjects({
          status: 'ACTIVE',
          page: 0,
          size: 200,
        })
      : of(null);

    forkJoin({
      board: boardRequest,
      people: peopleRequest,
      projects: projectsRequest,
    })
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: ({ board, people, projects }) => {
          this.board = board;
          this.activePeople = people?.content ?? [];
          this.activeProjects = projects?.content ?? [];
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.errorMessage = parsedError.message;
          this.eventLogService.log('planning.load.error', parsedError);
        },
      });
  }

  refreshBoard(): void {
    if (!this.weekId) {
      return;
    }

    this.refreshing = true;
    this.planningApiService
      .getWeekPlanningBoard(this.weekId)
      .pipe(
        finalize(() => {
          this.refreshing = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (board) => {
          this.board = board;
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.errorMessage = parsedError.message;
        },
      });
  }

  getDayLabel(dayPlan: DayPlan): string {
    const labels: Record<string, string> = {
      MONDAY: 'Mon',
      TUESDAY: 'Tue',
      WEDNESDAY: 'Wed',
      THURSDAY: 'Thu',
      FRIDAY: 'Fri',
    };
    return labels[dayPlan.dayOfWeek] ?? dayPlan.dayOfWeek;
  }

  trackByDayPlanId(_: number, dayPlan: DayPlan): string {
    return dayPlan.id;
  }

  trackByDayProjectId(_: number, dayProject: DayProject): string {
    return dayProject.id;
  }

  trackByAssignmentId(_: number, assignment: PlanningAssignment): string {
    return assignment.id;
  }

  trackByTaskId(_: number, task: Task): string {
    return task.id;
  }

  allowDrop(event: DragEvent): void {
    if (!this.canEditPlanning) {
      return;
    }
    event.preventDefault();
  }

  onPersonDragStart(person: PersonSummary): void {
    this.draggedPerson = person;
  }

  onDropPerson(event: DragEvent, dayPlan: DayPlan, dayProject: DayProject): void {
    event.preventDefault();
    if (!this.canEditPlanning || !this.draggedPerson) {
      return;
    }

    const alreadyAssigned = dayProject.assignments.some(
      (assignment) => assignment.person.id === this.draggedPerson?.id
    );
    if (alreadyAssigned) {
      this.errorMessage = 'Person is already assigned to this project/day.';
      return;
    }

    this.assignmentTarget = {
      dayPlanId: dayPlan.id,
      projectId: dayProject.project.id,
      person: this.draggedPerson,
    };
    this.modalError = '';
    this.assignmentForm.reset({
      estimatedHours: 0,
      actualHours: null,
      taskDescription: '',
    });
    this.assignmentModalOpen = true;
  }

  closeAssignmentModal(): void {
    this.assignmentModalOpen = false;
  }

  createAssignment(): void {
    if (!this.assignmentTarget) {
      return;
    }
    this.modalError = '';
    if (this.assignmentForm.invalid) {
      this.assignmentForm.markAllAsTouched();
      return;
    }

    const actualHoursControl = this.assignmentForm.controls.actualHours.value;
    const payload: AssignmentCreateRequest = {
      personId: this.assignmentTarget.person.id,
      estimatedHours: Number(this.assignmentForm.controls.estimatedHours.value ?? 0),
      actualHours:
        actualHoursControl === null || actualHoursControl === ('' as unknown)
          ? null
          : Number(actualHoursControl),
      taskDescription: this.assignmentForm.controls.taskDescription.value ?? '',
    };

    this.savingAssignment = true;
    this.planningApiService
      .createPlanningAssignment(
        this.weekId,
        this.assignmentTarget.dayPlanId,
        this.assignmentTarget.projectId,
        payload
      )
      .pipe(
        finalize(() => {
          this.savingAssignment = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.assignmentModalOpen = false;
          this.refreshBoard();
          this.eventLogService.log('planning.assignment.create.success', payload);
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.modalError = parsedError.message;
        },
      });
  }

  openHoursModal(dayPlan: DayPlan, dayProject: DayProject, assignment: PlanningAssignment): void {
    if (!this.canEditPlanning) {
      return;
    }

    this.hoursTarget = {
      dayPlanId: dayPlan.id,
      projectId: dayProject.project.id,
      assignmentId: assignment.id,
    };
    this.modalError = '';
    this.hoursForm.reset({
      estimatedHours: assignment.estimatedHours,
      actualHours: assignment.actualHours,
    });
    this.hoursModalOpen = true;
  }

  closeHoursModal(): void {
    this.hoursModalOpen = false;
  }

  saveHours(): void {
    if (!this.hoursTarget) {
      return;
    }
    this.modalError = '';
    if (this.hoursForm.invalid) {
      this.hoursForm.markAllAsTouched();
      return;
    }

    const actualHoursControl = this.hoursForm.controls.actualHours.value;
    const payload: AssignmentUpdateRequest = {
      estimatedHours: Number(this.hoursForm.controls.estimatedHours.value ?? 0),
      actualHours:
        actualHoursControl === null || actualHoursControl === ('' as unknown)
          ? null
          : Number(actualHoursControl),
    };

    this.savingHours = true;
    this.planningApiService
      .updatePlanningAssignment(
        this.weekId,
        this.hoursTarget.dayPlanId,
        this.hoursTarget.projectId,
        this.hoursTarget.assignmentId,
        payload
      )
      .pipe(
        finalize(() => {
          this.savingHours = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.hoursModalOpen = false;
          this.refreshBoard();
          this.eventLogService.log('planning.assignment.update.success', payload);
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.modalError = parsedError.message;
        },
      });
  }

  removeAssignment(dayPlan: DayPlan, dayProject: DayProject, assignment: PlanningAssignment): void {
    if (!this.canEditPlanning) {
      return;
    }
    if (!window.confirm('Remove this assignment and all linked tasks?')) {
      return;
    }

    this.planningApiService
      .deletePlanningAssignment(
        this.weekId,
        dayPlan.id,
        dayProject.project.id,
        assignment.id
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.refreshBoard(),
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.errorMessage = parsedError.message;
        },
      });
  }

  openTaskCreateModal(dayPlan: DayPlan, dayProject: DayProject, assignment: PlanningAssignment): void {
    if (!this.canEditPlanning) {
      return;
    }

    this.taskTarget = {
      dayPlanId: dayPlan.id,
      projectId: dayProject.project.id,
      assignmentId: assignment.id,
    };
    this.modalError = '';
    this.deletingTask = false;
    this.taskForm.reset({
      description: '',
    });
    this.taskModalOpen = true;
  }

  openTaskEditModal(
    dayPlan: DayPlan,
    dayProject: DayProject,
    assignment: PlanningAssignment,
    task: Task
  ): void {
    if (!this.canEditPlanning) {
      return;
    }

    this.taskTarget = {
      dayPlanId: dayPlan.id,
      projectId: dayProject.project.id,
      assignmentId: assignment.id,
      taskId: task.id,
    };
    this.modalError = '';
    this.deletingTask = false;
    this.taskForm.reset({
      description: task.description,
    });
    this.taskModalOpen = true;
  }

  closeTaskModal(): void {
    this.taskModalOpen = false;
    this.taskTarget = null;
    this.deletingTask = false;
  }

  saveTask(): void {
    if (!this.taskTarget) {
      return;
    }
    this.modalError = '';
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.savingTask = true;

    const description = this.taskForm.controls.description.value ?? '';

    if (!this.taskTarget.taskId) {
      const payload: TaskCreateRequest = { description };
      this.planningApiService
        .createAssignmentTask(
          this.weekId,
          this.taskTarget.dayPlanId,
          this.taskTarget.projectId,
          this.taskTarget.assignmentId,
          payload
        )
        .pipe(
          finalize(() => {
            this.savingTask = false;
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: () => {
            this.taskModalOpen = false;
            this.taskTarget = null;
            this.refreshBoard();
          },
          error: (error: unknown) => {
            const parsedError = this.apiErrorService.parse(error);
            this.modalError = parsedError.message;
          },
        });
      return;
    }

    const payload: TaskUpdateRequest = { description };
    this.planningApiService
      .updateAssignmentTask(
        this.weekId,
        this.taskTarget.dayPlanId,
        this.taskTarget.projectId,
        this.taskTarget.assignmentId,
        this.taskTarget.taskId,
        payload
      )
      .pipe(
        finalize(() => {
          this.savingTask = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.taskModalOpen = false;
          this.taskTarget = null;
          this.refreshBoard();
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.modalError = parsedError.message;
        },
      });
  }

  deleteTaskFromModal(): void {
    if (!this.canEditPlanning || !this.taskTarget?.taskId) {
      return;
    }

    this.modalError = '';
    this.deletingTask = true;

    this.planningApiService
      .deleteAssignmentTask(
        this.weekId,
        this.taskTarget.dayPlanId,
        this.taskTarget.projectId,
        this.taskTarget.assignmentId,
        this.taskTarget.taskId
      )
      .pipe(
        finalize(() => {
          this.deletingTask = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.taskModalOpen = false;
          this.taskTarget = null;
          this.refreshBoard();
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.modalError = parsedError.message;
        },
      });
  }

  addProjectToDay(dayPlan: DayPlan): void {
    if (!this.canEditPlanning) {
      return;
    }
    const projectId = this.dayProjectSelections[dayPlan.id];
    if (!projectId) {
      return;
    }

    this.planningApiService
      .upsertDayPlanProject(this.weekId, dayPlan.id, projectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.dayProjectSelections[dayPlan.id] = '';
          this.refreshBoard();
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.errorMessage = parsedError.message;
        },
      });
  }

  openRemoveProjectModal(dayPlan: DayPlan, dayProject: DayProject): void {
    if (!this.canEditPlanning) {
      return;
    }
    this.projectRemovalTarget = {
      dayPlanId: dayPlan.id,
      projectId: dayProject.project.id,
      projectName: dayProject.project.name,
    };
    this.modalError = '';
    this.removeProjectModalOpen = true;
  }

  closeRemoveProjectModal(): void {
    this.removeProjectModalOpen = false;
  }

  confirmRemoveProject(): void {
    if (!this.projectRemovalTarget) {
      return;
    }

    this.deletingProject = true;
    this.modalError = '';

    this.planningApiService
      .deleteDayPlanProject(
        this.weekId,
        this.projectRemovalTarget.dayPlanId,
        this.projectRemovalTarget.projectId
      )
      .pipe(
        finalize(() => {
          this.deletingProject = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.removeProjectModalOpen = false;
          this.refreshBoard();
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.modalError = parsedError.message;
        },
      });
  }
}
