import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import {
  DayOfWeek,
  DayPerson,
  DayPersonProject,
  DayPlan,
  PersonSummary,
  ProjectSummary,
  Task,
  WeekPlanningBoard
} from '../../core/models/api.models';
import { PersonsApiService } from '../../core/services/api/persons-api.service';
import { PlanningApiService } from '../../core/services/api/planning-api.service';
import { ProjectsApiService } from '../../core/services/api/projects-api.service';
import { AuthSessionStore } from '../../core/services/auth-session.store';
import { ErrorMapperService, UiError } from '../../core/services/error-mapper.service';
import { AuditLogService } from '../../core/services/audit-log.service';
import { ModalShellComponent } from '../../shared/components/modal-shell/modal-shell.component';

interface AddPersonContext {
  dayPlan: DayPlan;
}

interface AddProjectContext {
  dayPlan: DayPlan;
  dayPerson: DayPerson;
}

interface AddTaskContext {
  dayPlan: DayPlan;
  dayPerson: DayPerson;
  dayPersonProject: DayPersonProject;
}

interface RemoveTaskContext extends AddTaskContext {
  task: Task;
}

interface RemovePersonContext {
  dayPlan: DayPlan;
  dayPerson: DayPerson;
}

interface RemoveProjectContext {
  dayPlan: DayPlan;
  dayPerson: DayPerson;
  dayPersonProject: DayPersonProject;
}

@Component({
  selector: 'app-planning-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalShellComponent],
  templateUrl: './planning-page.component.html',
  styleUrl: './planning-page.component.scss'
})
export class PlanningPageComponent implements OnInit {
  readonly addPersonForm = this.fb.nonNullable.group({
    personId: ['', Validators.required]
  });

  readonly addProjectForm = this.fb.nonNullable.group({
    projectId: ['', Validators.required]
  });

  readonly addTaskForm = this.fb.nonNullable.group({
    description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2000)]]
  });

  readonly weekdayOrder: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

  weekId = '';
  board: WeekPlanningBoard | null = null;
  dayPlans: DayPlan[] = [];

  activePersons: PersonSummary[] = [];
  activeProjects: ProjectSummary[] = [];

  boardLoading = false;
  boardError: UiError | null = null;
  modalError: UiError | null = null;
  actionBusy = false;

  addPersonContext: AddPersonContext | null = null;
  addProjectContext: AddProjectContext | null = null;
  addTaskContext: AddTaskContext | null = null;
  removeTaskContext: RemoveTaskContext | null = null;
  removePersonContext: RemovePersonContext | null = null;
  removeProjectContext: RemoveProjectContext | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly planningApi: PlanningApiService,
    private readonly personsApi: PersonsApiService,
    private readonly projectsApi: ProjectsApiService,
    private readonly auth: AuthSessionStore,
    private readonly errorMapper: ErrorMapperService,
    private readonly fb: FormBuilder,
    private readonly auditLog: AuditLogService
  ) {}

  ngOnInit(): void {
    this.weekId = this.route.snapshot.paramMap.get('weekId') ?? '';
    this.loadBoard();
    if (this.isAdmin) {
      this.loadReferenceData();
    }
  }

  get isAdmin(): boolean {
    return this.auth.account?.role === 'ADMIN';
  }

  get canEdit(): boolean {
    return this.isAdmin && this.board?.week.status === 'PLANNED';
  }

  get weekTitleCode(): string {
    if (!this.board) {
      return '';
    }

    const date = new Date(`${this.board.week.weekStart}T00:00:00`);
    const weekIndex = Math.floor((date.getDate() - 1) / 7) + 1;
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `W${weekIndex}${month}${date.getFullYear()}`;
  }

  loadBoard(): void {
    if (!this.weekId) {
      return;
    }

    this.boardLoading = true;
    this.boardError = null;

    this.planningApi
      .getWeekPlanningBoard(this.weekId, { includeEmptyDays: true })
      .pipe(finalize(() => (this.boardLoading = false)))
      .subscribe({
        next: (response) => {
          this.board = response;
          this.dayPlans = this.toWeekdayColumns(response.dayPlans);
        },
        error: (error) => {
          this.boardError = this.errorMapper.map(error);
        }
      });
  }

  private loadReferenceData(): void {
    this.personsApi.listPersons({ page: 0, size: 100, sort: ['name,asc'], status: 'ACTIVE' }).subscribe({
      next: (response) => {
        this.activePersons = response.content;
      }
    });

    this.projectsApi.listProjects({ page: 0, size: 100, sort: ['name,asc'], status: 'ACTIVE' }).subscribe({
      next: (response) => {
        this.activeProjects = response.content;
      }
    });
  }

  dayLabel(dayPlan: DayPlan): string {
    const date = new Date(`${dayPlan.date}T00:00:00`);
    return formatDate(date, 'EEE d MMM', 'en-US');
  }

  openAddPerson(dayPlan: DayPlan): void {
    this.addPersonForm.reset({ personId: '' });
    this.modalError = null;
    this.addPersonContext = { dayPlan };
  }

  confirmAddPerson(): void {
    if (!this.addPersonContext) {
      return;
    }
    if (this.addPersonForm.invalid) {
      this.addPersonForm.markAllAsTouched();
      return;
    }

    this.runAction(
      this.planningApi.addPersonToDayPlan(this.weekId, this.addPersonContext.dayPlan.dayPlanId, {
        personId: this.addPersonForm.controls.personId.value
      }),
      'person_added',
      () => {
        this.addPersonContext = null;
        this.loadBoard();
      }
    );
  }

  openAddProject(dayPlan: DayPlan, dayPerson: DayPerson): void {
    this.addProjectForm.reset({ projectId: '' });
    this.modalError = null;
    this.addProjectContext = { dayPlan, dayPerson };
  }

  confirmAddProject(): void {
    if (!this.addProjectContext) {
      return;
    }

    if (this.addProjectForm.invalid) {
      this.addProjectForm.markAllAsTouched();
      return;
    }

    const ctx = this.addProjectContext;
    this.runAction(
      this.planningApi.addProjectToDayPerson(this.weekId, ctx.dayPlan.dayPlanId, ctx.dayPerson.dayPersonId, {
        projectId: this.addProjectForm.controls.projectId.value
      }),
      'project_added',
      () => {
        this.addProjectContext = null;
        this.loadBoard();
      }
    );
  }

  openAddTask(dayPlan: DayPlan, dayPerson: DayPerson, dayPersonProject: DayPersonProject): void {
    this.addTaskForm.reset({ description: '' });
    this.modalError = null;
    this.addTaskContext = { dayPlan, dayPerson, dayPersonProject };
  }

  confirmAddTask(): void {
    if (!this.addTaskContext) {
      return;
    }

    if (this.addTaskForm.invalid) {
      this.addTaskForm.markAllAsTouched();
      return;
    }

    const ctx = this.addTaskContext;
    this.runAction(
      this.planningApi.addTaskToDayPersonProject(
        this.weekId,
        ctx.dayPlan.dayPlanId,
        ctx.dayPerson.dayPersonId,
        ctx.dayPersonProject.dayPersonProjectId,
        { description: this.addTaskForm.controls.description.value.trim() }
      ),
      'task_added',
      () => {
        this.addTaskContext = null;
        this.loadBoard();
      }
    );
  }

  openRemoveTask(
    dayPlan: DayPlan,
    dayPerson: DayPerson,
    dayPersonProject: DayPersonProject,
    task: Task
  ): void {
    this.modalError = null;
    this.removeTaskContext = { dayPlan, dayPerson, dayPersonProject, task };
  }

  confirmRemoveTask(): void {
    if (!this.removeTaskContext) {
      return;
    }

    const ctx = this.removeTaskContext;
    this.runAction(
      this.planningApi.removeTaskFromDayPersonProject(
        this.weekId,
        ctx.dayPlan.dayPlanId,
        ctx.dayPerson.dayPersonId,
        ctx.dayPersonProject.dayPersonProjectId,
        ctx.task.taskId
      ),
      'task_removed',
      () => {
        this.removeTaskContext = null;
        this.loadBoard();
      }
    );
  }

  openRemovePerson(dayPlan: DayPlan, dayPerson: DayPerson): void {
    this.modalError = null;
    this.removePersonContext = { dayPlan, dayPerson };
  }

  confirmRemovePerson(): void {
    if (!this.removePersonContext) {
      return;
    }

    const ctx = this.removePersonContext;
    this.runAction(
      this.planningApi.removePersonFromDayPlan(this.weekId, ctx.dayPlan.dayPlanId, ctx.dayPerson.dayPersonId),
      'person_removed',
      () => {
        this.removePersonContext = null;
        this.loadBoard();
      }
    );
  }

  openRemoveProject(dayPlan: DayPlan, dayPerson: DayPerson, dayPersonProject: DayPersonProject): void {
    this.modalError = null;
    this.removeProjectContext = { dayPlan, dayPerson, dayPersonProject };
  }

  confirmRemoveProject(): void {
    if (!this.removeProjectContext) {
      return;
    }

    const ctx = this.removeProjectContext;
    this.runAction(
      this.planningApi.removeProjectFromDayPerson(
        this.weekId,
        ctx.dayPlan.dayPlanId,
        ctx.dayPerson.dayPersonId,
        ctx.dayPersonProject.dayPersonProjectId
      ),
      'project_removed',
      () => {
        this.removeProjectContext = null;
        this.loadBoard();
      }
    );
  }

  clearModals(): void {
    this.addPersonContext = null;
    this.addProjectContext = null;
    this.addTaskContext = null;
    this.removeTaskContext = null;
    this.removePersonContext = null;
    this.removeProjectContext = null;
    this.modalError = null;
  }

  canAddPerson(dayPlan: DayPlan): boolean {
    return this.canEdit && !!dayPlan.dayPlanId;
  }

  trackDayPlan(_index: number, dayPlan: DayPlan): string {
    return dayPlan.dayPlanId;
  }

  trackDayPerson(_index: number, dayPerson: DayPerson): string {
    return dayPerson.dayPersonId;
  }

  trackProject(_index: number, project: DayPersonProject): string {
    return project.dayPersonProjectId;
  }

  trackTask(_index: number, task: Task): string {
    return task.taskId;
  }

  private runAction(request$: any, eventName: string, onSuccess: () => void): void {
    this.actionBusy = true;
    this.modalError = null;

    request$.pipe(finalize(() => (this.actionBusy = false))).subscribe({
      next: () => {
        this.auditLog.log(eventName, { weekId: this.weekId });
        onSuccess();
      },
      error: (error: unknown) => {
        this.modalError = this.errorMapper.map(error);
      }
    });
  }

  private toWeekdayColumns(dayPlans: DayPlan[]): DayPlan[] {
    const byDay = new Map(dayPlans.map((item) => [item.dayOfWeek, item]));
    return this.weekdayOrder
      .map((day) => byDay.get(day))
      .filter((value): value is DayPlan => !!value);
  }
}
