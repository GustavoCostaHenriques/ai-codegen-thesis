import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import {
  DayPlan,
  DayPerson,
  DayPersonProject,
  PersonSummary,
  ProjectSummary,
  Task,
  WeekPlanningBoard,
} from '../../../core/models/api.models';
import { formatDateCompact, generateWeekCode } from '../../../core/services/date-utils';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PersonsApiService } from '../../../core/services/api/persons-api.service';
import { PlanningApiService } from '../../../core/services/api/planning-api.service';
import { ProjectsApiService } from '../../../core/services/api/projects-api.service';
import { ErrorMapperService } from '../../../core/services/error-mapper.service';
import { SessionService } from '../../../core/services/session.service';
import { TopNavComponent } from '../../../shared/components/top-nav.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

type DayPersonContext = {
  dayPlan: DayPlan;
  dayPerson: DayPerson;
};

type DayPersonProjectContext = DayPersonContext & {
  dayPersonProject: DayPersonProject;
};

type TaskContext = DayPersonProjectContext & {
  task: Task;
};

@Component({
  selector: 'app-week-planning',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, TopNavComponent, ModalComponent],
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
})
export class PlanningComponent implements OnInit {
  private readonly dayOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

  weekId = '';
  planningBoard: WeekPlanningBoard | null = null;
  dayPlans: DayPlan[] = [];

  activePersons: PersonSummary[] = [];
  activeProjects: ProjectSummary[] = [];

  loading = false;
  saving = false;

  pageError = '';
  modalError = '';

  showAddPersonModal = false;
  showAddProjectModal = false;
  showAddTaskModal = false;
  showRemoveTaskModal = false;
  showRemovePersonModal = false;
  showRemoveProjectModal = false;

  addPersonDayPlan: DayPlan | null = null;
  selectedPersonId = '';

  addProjectContext: DayPersonContext | null = null;
  selectedProjectId = '';

  addTaskContext: DayPersonProjectContext | null = null;
  taskDescription = '';

  removeTaskContext: TaskContext | null = null;
  removePersonContext: DayPersonContext | null = null;
  removeProjectContext: DayPersonProjectContext | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly planningApiService: PlanningApiService,
    private readonly personsApiService: PersonsApiService,
    private readonly projectsApiService: ProjectsApiService,
    private readonly sessionService: SessionService,
    private readonly errorMapper: ErrorMapperService,
    private readonly i18nService: I18nService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const weekId = params.get('weekId');
      if (!weekId) {
        return;
      }

      this.weekId = weekId;
      this.loadPlanningBoard();
      this.loadLookupData();
    });
  }

  get canEditPlanning(): boolean {
    return this.sessionService.isAdmin() && this.planningBoard?.week.status === 'PLANNED';
  }

  get weekTitleParams(): Record<string, string> {
    return {
      weekCode: this.weekCode,
    };
  }

  get weekCode(): string {
    if (!this.planningBoard) {
      return this.i18nService.translate('planning.titleFallback');
    }

    return generateWeekCode(this.planningBoard.week.weekStart);
  }

  dayHeader(dayPlan: DayPlan): string {
    const dayLabel = this.i18nService.translate(`weekDay.${dayPlan.dayOfWeek}`);
    const dateLabel = formatDateCompact(dayPlan.date, this.i18nService.language());
    return `${dayLabel} ${dateLabel}`;
  }

  loadPlanningBoard(): void {
    this.loading = true;
    this.pageError = '';

    const personId = this.sessionService.isAdmin() ? undefined : this.sessionService.account()?.personId;

    this.planningApiService
      .getWeekPlanningBoard(this.weekId, personId, true)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (board) => {
          this.planningBoard = board;
          this.dayPlans = this.sortDayPlans(board.dayPlans);
        },
        error: (error: unknown) => {
          this.pageError = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('planning.loadFailed'),
          );
        },
      });
  }

  loadLookupData(): void {
    if (!this.sessionService.isAdmin()) {
      return;
    }

    forkJoin({
      persons: this.personsApiService.listPersons({
        page: 0,
        size: 100,
        sort: ['name,asc'],
        status: 'ACTIVE',
      }),
      projects: this.projectsApiService.listProjects({
        page: 0,
        size: 100,
        sort: ['name,asc'],
        status: 'ACTIVE',
      }),
    })
      .pipe(catchError(() => of({ persons: null, projects: null })))
      .subscribe((response) => {
        this.activePersons = response.persons?.content ?? [];
        this.activeProjects = response.projects?.content ?? [];
      });
  }

  openAddPerson(dayPlan: DayPlan): void {
    this.modalError = '';
    this.addPersonDayPlan = dayPlan;
    this.selectedPersonId = this.activePersons[0]?.personId ?? '';
    this.showAddPersonModal = true;
  }

  confirmAddPerson(): void {
    if (!this.addPersonDayPlan || !this.selectedPersonId) {
      return;
    }

    this.saving = true;

    this.planningApiService
      .addPersonToDayPlan(this.weekId, this.addPersonDayPlan.dayPlanId, {
        personId: this.selectedPersonId,
      })
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.showAddPersonModal = false;
          this.loadPlanningBoard();
        },
        error: (error: unknown) => {
          this.modalError = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('planning.saveFailed'),
          );
        },
      });
  }

  openAddProject(dayPlan: DayPlan, dayPerson: DayPerson): void {
    this.modalError = '';
    this.addProjectContext = { dayPlan, dayPerson };
    this.selectedProjectId = this.activeProjects[0]?.projectId ?? '';
    this.showAddProjectModal = true;
  }

  confirmAddProject(): void {
    if (!this.addProjectContext || !this.selectedProjectId) {
      return;
    }

    this.saving = true;

    this.planningApiService
      .addProjectToDayPerson(
        this.weekId,
        this.addProjectContext.dayPlan.dayPlanId,
        this.addProjectContext.dayPerson.dayPersonId,
        { projectId: this.selectedProjectId },
      )
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.showAddProjectModal = false;
          this.loadPlanningBoard();
        },
        error: (error: unknown) => {
          this.modalError = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('planning.saveFailed'),
          );
        },
      });
  }

  openAddTask(dayPlan: DayPlan, dayPerson: DayPerson, dayPersonProject: DayPersonProject): void {
    this.modalError = '';
    this.taskDescription = '';
    this.addTaskContext = { dayPlan, dayPerson, dayPersonProject };
    this.showAddTaskModal = true;
  }

  confirmAddTask(): void {
    const description = this.taskDescription.trim();
    if (!this.addTaskContext || !description) {
      this.modalError = this.i18nService.translate('common.required');
      return;
    }

    this.saving = true;

    this.planningApiService
      .addTaskToDayPersonProject(
        this.weekId,
        this.addTaskContext.dayPlan.dayPlanId,
        this.addTaskContext.dayPerson.dayPersonId,
        this.addTaskContext.dayPersonProject.dayPersonProjectId,
        { description },
      )
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.showAddTaskModal = false;
          this.loadPlanningBoard();
        },
        error: (error: unknown) => {
          this.modalError = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('planning.saveFailed'),
          );
        },
      });
  }

  openRemoveTask(dayPlan: DayPlan, dayPerson: DayPerson, dayPersonProject: DayPersonProject, task: Task): void {
    this.modalError = '';
    this.removeTaskContext = { dayPlan, dayPerson, dayPersonProject, task };
    this.showRemoveTaskModal = true;
  }

  confirmRemoveTask(): void {
    if (!this.removeTaskContext) {
      return;
    }

    this.saving = true;

    this.planningApiService
      .removeTaskFromDayPersonProject(
        this.weekId,
        this.removeTaskContext.dayPlan.dayPlanId,
        this.removeTaskContext.dayPerson.dayPersonId,
        this.removeTaskContext.dayPersonProject.dayPersonProjectId,
        this.removeTaskContext.task.taskId,
      )
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.showRemoveTaskModal = false;
          this.loadPlanningBoard();
        },
        error: (error: unknown) => {
          this.modalError = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('planning.saveFailed'),
          );
        },
      });
  }

  openRemovePerson(dayPlan: DayPlan, dayPerson: DayPerson): void {
    this.modalError = '';
    this.removePersonContext = { dayPlan, dayPerson };
    this.showRemovePersonModal = true;
  }

  confirmRemovePerson(): void {
    if (!this.removePersonContext) {
      return;
    }

    this.saving = true;

    this.planningApiService
      .removePersonFromDayPlan(
        this.weekId,
        this.removePersonContext.dayPlan.dayPlanId,
        this.removePersonContext.dayPerson.dayPersonId,
      )
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.showRemovePersonModal = false;
          this.loadPlanningBoard();
        },
        error: (error: unknown) => {
          this.modalError = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('planning.saveFailed'),
          );
        },
      });
  }

  openRemoveProject(dayPlan: DayPlan, dayPerson: DayPerson, dayPersonProject: DayPersonProject): void {
    this.modalError = '';
    this.removeProjectContext = { dayPlan, dayPerson, dayPersonProject };
    this.showRemoveProjectModal = true;
  }

  confirmRemoveProject(): void {
    if (!this.removeProjectContext) {
      return;
    }

    this.saving = true;

    this.planningApiService
      .removeProjectFromDayPerson(
        this.weekId,
        this.removeProjectContext.dayPlan.dayPlanId,
        this.removeProjectContext.dayPerson.dayPersonId,
        this.removeProjectContext.dayPersonProject.dayPersonProjectId,
      )
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.showRemoveProjectModal = false;
          this.loadPlanningBoard();
        },
        error: (error: unknown) => {
          this.modalError = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('planning.saveFailed'),
          );
        },
      });
  }

  private sortDayPlans(dayPlans: DayPlan[]): DayPlan[] {
    const dayOrderMap = new Map<string, number>(this.dayOrder.map((day, index) => [day, index]));

    return dayPlans
      .filter((dayPlan) => dayOrderMap.has(dayPlan.dayOfWeek))
      .sort((left, right) => {
        const leftOrder = dayOrderMap.get(left.dayOfWeek) ?? 0;
        const rightOrder = dayOrderMap.get(right.dayOfWeek) ?? 0;
        return leftOrder - rightOrder;
      });
  }
}
