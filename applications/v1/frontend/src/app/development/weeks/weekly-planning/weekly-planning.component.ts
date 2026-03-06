import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { TopNavComponent } from '../../../shared/top-nav/top-nav.component';
import {
  DayPlan,
  DayUser,
  DayUserProject,
  Project,
  Task,
  User,
  WeekDetail,
} from '../../models/api-models';
import { PlanningApiService } from '../../services/planning-api.service';
import { ProjectsApiService } from '../../services/projects-api.service';
import { UsersApiService } from '../../services/users-api.service';
import { WeeksApiService } from '../../services/weeks-api.service';

type RemoveItemType = 'USER' | 'PROJECT' | 'TASK';

@Component({
  selector: 'app-weekly-planning',
  imports: [CommonModule, ReactiveFormsModule, TopNavComponent],
  templateUrl: './weekly-planning.component.html',
  styleUrl: './weekly-planning.component.css',
})
export class WeeklyPlanningComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly weeksApi = inject(WeeksApiService);
  private readonly usersApi = inject(UsersApiService);
  private readonly projectsApi = inject(ProjectsApiService);
  private readonly planningApi = inject(PlanningApiService);

  weekId = '';
  focusedDate: string | null = null;

  week: WeekDetail | null = null;
  users: User[] = [];
  projects: Project[] = [];

  errorMessage = '';

  addUserModalOpen = false;
  assignProjectModalOpen = false;
  addTaskModalOpen = false;
  removeModalOpen = false;

  readonly addUserForm = this.formBuilder.nonNullable.group({
    date: ['', [Validators.required]],
    userId: ['', [Validators.required]],
  });

  readonly assignProjectForm = this.formBuilder.nonNullable.group({
    date: ['', [Validators.required]],
    userId: ['', [Validators.required]],
    projectId: ['', [Validators.required]],
  });

  readonly addTaskForm = this.formBuilder.nonNullable.group({
    date: ['', [Validators.required]],
    userId: ['', [Validators.required]],
    projectId: ['', [Validators.required]],
    text: ['', [Validators.required, Validators.minLength(3)]],
  });

  readonly removeForm = this.formBuilder.nonNullable.group({
    itemType: ['TASK' as RemoveItemType, [Validators.required]],
    date: ['', [Validators.required]],
    userId: ['', [Validators.required]],
    projectId: [''],
    taskId: [''],
  });

  get dayPlans(): DayPlan[] {
    return this.week?.dayPlans ?? [];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.weekId = params.get('weekId') ?? '';
      this.focusedDate = params.get('date');
      this.loadScreenData();
    });
  }

  loadScreenData(): void {
    this.errorMessage = '';

    if (!this.weekId) {
      return;
    }

    forkJoin({
      week: this.weeksApi.getWeek(this.weekId),
      usersPage: this.usersApi.listUsers(0, 200),
      projectsPage: this.projectsApi.listProjects(0, 200),
    }).subscribe({
      next: response => {
        this.week = response.week;
        this.users = response.usersPage.items;
        this.projects = response.projectsPage.items;
        this.fillDefaultDates();
      },
      error: error => {
        this.errorMessage = error.message;
      },
    });
  }

  openAddUserModal(): void {
    this.addUserForm.reset({ date: this.defaultDate, userId: '' });
    this.addUserModalOpen = true;
  }

  closeAddUserModal(): void {
    this.addUserModalOpen = false;
  }

  addUserToDay(): void {
    if (this.addUserForm.invalid || !this.weekId) {
      this.addUserForm.markAllAsTouched();
      return;
    }

    const payload = this.addUserForm.getRawValue();
    this.planningApi.addUserToDay(this.weekId, payload.date, { userId: payload.userId }).subscribe({
      next: () => {
        this.closeAddUserModal();
        this.refreshWeek();
      },
      error: error => {
        this.errorMessage = error.message;
      },
    });
  }

  openAssignProjectModal(): void {
    this.assignProjectForm.reset({
      date: this.defaultDate,
      userId: '',
      projectId: '',
    });
    this.assignProjectModalOpen = true;
  }

  closeAssignProjectModal(): void {
    this.assignProjectModalOpen = false;
  }

  assignProjectToUser(): void {
    if (this.assignProjectForm.invalid || !this.weekId) {
      this.assignProjectForm.markAllAsTouched();
      return;
    }

    const payload = this.assignProjectForm.getRawValue();
    this.planningApi
      .assignProjectToDayUser(this.weekId, payload.date, payload.userId, {
        projectId: payload.projectId,
      })
      .subscribe({
        next: () => {
          this.closeAssignProjectModal();
          this.refreshWeek();
        },
        error: error => {
          this.errorMessage = error.message;
        },
      });
  }

  openAddTaskModal(): void {
    this.addTaskForm.reset({
      date: this.defaultDate,
      userId: '',
      projectId: '',
      text: '',
    });
    this.addTaskModalOpen = true;
  }

  closeAddTaskModal(): void {
    this.addTaskModalOpen = false;
  }

  addTask(): void {
    if (this.addTaskForm.invalid || !this.weekId) {
      this.addTaskForm.markAllAsTouched();
      return;
    }

    const payload = this.addTaskForm.getRawValue();
    this.planningApi
      .addTask(this.weekId, payload.date, payload.userId, payload.projectId, {
        text: payload.text,
      })
      .subscribe({
        next: () => {
          this.closeAddTaskModal();
          this.refreshWeek();
        },
        error: error => {
          this.errorMessage = error.message;
        },
      });
  }

  openRemoveModal(): void {
    this.removeForm.reset({
      itemType: 'TASK',
      date: this.defaultDate,
      userId: '',
      projectId: '',
      taskId: '',
    });
    this.removeModalOpen = true;
  }

  closeRemoveModal(): void {
    this.removeModalOpen = false;
  }

  removeItem(): void {
    if (this.removeForm.invalid || !this.weekId) {
      this.removeForm.markAllAsTouched();
      return;
    }

    const payload = this.removeForm.getRawValue();

    let action$: Observable<void> | null = null;

    if (payload.itemType === 'USER') {
      action$ = this.planningApi.removeUserFromDay(this.weekId, payload.date, payload.userId);
    }

    if (payload.itemType === 'PROJECT' && payload.projectId) {
      action$ = this.planningApi.removeProjectFromDayUser(
        this.weekId,
        payload.date,
        payload.userId,
        payload.projectId,
      );
    }

    if (payload.itemType === 'TASK' && payload.projectId && payload.taskId) {
      action$ = this.planningApi.removeTask(
        this.weekId,
        payload.date,
        payload.userId,
        payload.projectId,
        payload.taskId,
      );
    }

    if (!action$) {
      this.errorMessage = 'Select a valid item to remove.';
      return;
    }

    action$.subscribe({
      next: () => {
        this.closeRemoveModal();
        this.refreshWeek();
      },
      error: error => {
        this.errorMessage = error.message;
      },
    });
  }

  usersForDay(date: string): DayUser[] {
    return this.dayPlans.find(day => day.date === date)?.users ?? [];
  }

  projectsForDayUser(date: string, userId: string): DayUserProject[] {
    return this.usersForDay(date).find(user => user.user.id === userId)?.projects ?? [];
  }

  tasksForDayUserProject(date: string, userId: string, projectId: string): Task[] {
    return (
      this.projectsForDayUser(date, userId).find(project => project.project.id === projectId)?.tasks ?? []
    );
  }

  isFocusedDay(day: DayPlan): boolean {
    return this.focusedDate !== null && day.date === this.focusedDate;
  }

  private refreshWeek(): void {
    if (!this.weekId) {
      return;
    }

    this.weeksApi.getWeek(this.weekId).subscribe({
      next: week => {
        this.week = week;
        this.fillDefaultDates();
      },
      error: error => {
        this.errorMessage = error.message;
      },
    });
  }

  private get defaultDate(): string {
    return this.dayPlans[0]?.date ?? '';
  }

  private fillDefaultDates(): void {
    const date = this.defaultDate;

    if (!date) {
      return;
    }

    if (!this.addUserForm.value.date) {
      this.addUserForm.patchValue({ date });
    }

    if (!this.assignProjectForm.value.date) {
      this.assignProjectForm.patchValue({ date });
    }

    if (!this.addTaskForm.value.date) {
      this.addTaskForm.patchValue({ date });
    }

    if (!this.removeForm.value.date) {
      this.removeForm.patchValue({ date });
    }
  }
}
