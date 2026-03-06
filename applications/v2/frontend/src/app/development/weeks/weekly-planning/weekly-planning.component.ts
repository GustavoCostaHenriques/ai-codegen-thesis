import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ModalShellComponent } from '../../../shared/modal-shell/modal-shell.component';
import { DayPerson, DayPersonProject, Task, WeekPlanning } from '../../models/planning';
import { Person } from '../../models/person';
import { Project } from '../../models/project';
import { AuthService } from '../../services/auth.service';
import { PeopleService } from '../../services/people.service';
import { PlanningService } from '../../services/planning.service';
import { ProjectsService } from '../../services/projects.service';
import { WeeksService } from '../../services/weeks.service';

type PlanningModalType = 'addPerson' | 'addProject' | 'addTask' | 'removeTask' | 'removePerson' | 'removeProject';

type ModalSubmissionMap = Record<PlanningModalType, boolean>;

@Component({
  selector: 'app-weekly-planning',
  imports: [CommonModule, ReactiveFormsModule, ModalShellComponent],
  templateUrl: './weekly-planning.component.html',
  styleUrl: './weekly-planning.component.css',
})
export class WeeklyPlanningComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly weeksService = inject(WeeksService);
  private readonly planningService = inject(PlanningService);
  private readonly peopleService = inject(PeopleService);
  private readonly projectsService = inject(ProjectsService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  readonly addPersonForm = this.formBuilder.nonNullable.group({
    day: ['', [Validators.required]],
    personId: ['', [Validators.required]],
  });

  readonly addProjectForm = this.formBuilder.nonNullable.group({
    day: ['', [Validators.required]],
    personId: ['', [Validators.required]],
    projectId: ['', [Validators.required]],
  });

  readonly addTaskForm = this.formBuilder.nonNullable.group({
    day: ['', [Validators.required]],
    personId: ['', [Validators.required]],
    projectId: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  readonly removeTaskForm = this.formBuilder.nonNullable.group({
    day: ['', [Validators.required]],
    personId: ['', [Validators.required]],
    projectId: ['', [Validators.required]],
    taskId: ['', [Validators.required]],
  });

  readonly removePersonForm = this.formBuilder.nonNullable.group({
    day: ['', [Validators.required]],
    personId: ['', [Validators.required]],
  });

  readonly removeProjectForm = this.formBuilder.nonNullable.group({
    day: ['', [Validators.required]],
    personId: ['', [Validators.required]],
    projectId: ['', [Validators.required]],
  });

  weekId = '';
  planning: WeekPlanning | null = null;
  activePeople: Person[] = [];
  activeProjects: Project[] = [];

  isLoading = false;
  isSavingAction = false;
  isWeekActionsOpen = false;
  activeModal: PlanningModalType | null = null;
  errorMessage = '';

  readonly modalSubmitted: ModalSubmissionMap = {
    addPerson: false,
    addProject: false,
    addTask: false,
    removeTask: false,
    removePerson: false,
    removeProject: false,
  };

  readonly cardColors = ['#E9F5FF', '#F1F7E8', '#FFF3E8', '#F7F0FF', '#EEF4FF'];

  readonly weekActions = [
    { type: 'addPerson' as PlanningModalType, label: 'Add Person to Day' },
    { type: 'addProject' as PlanningModalType, label: 'Add Project to Person' },
    { type: 'addTask' as PlanningModalType, label: 'Add Task' },
    { type: 'removeTask' as PlanningModalType, label: 'Remove Task from Project' },
    { type: 'removePerson' as PlanningModalType, label: 'Remove Person from Day' },
    { type: 'removeProject' as PlanningModalType, label: 'Remove Project from Person' },
  ];

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const currentWeekId = params.get('weekId');

      if (!currentWeekId) {
        this.errorMessage = 'Week id is missing.';
        this.planning = null;
        return;
      }

      this.weekId = currentWeekId;
      void this.loadPlanning();
      void this.loadReferenceData();
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isWeekCompleted(): boolean {
    return this.planning?.status === 'COMPLETED';
  }

  warningTextVisible(): boolean {
    return this.isAdmin() && this.isWeekCompleted();
  }

  canOpenWeekActions(): boolean {
    return this.isAdmin() && !this.isWeekCompleted();
  }

  toggleWeekActions(): void {
    if (!this.canOpenWeekActions()) {
      return;
    }

    this.isWeekActionsOpen = !this.isWeekActionsOpen;
  }

  closeWeekActions(): void {
    this.isWeekActionsOpen = false;
  }

  openModal(modalType: PlanningModalType): void {
    if (!this.canOpenWeekActions()) {
      return;
    }

    this.activeModal = modalType;
    this.isWeekActionsOpen = false;
    this.modalSubmitted[modalType] = false;
    this.errorMessage = '';
    this.resetModalForm(modalType);
  }

  closeModal(): void {
    this.activeModal = null;
    this.isSavingAction = false;
  }

  weekLabel(): string {
    if (!this.planning) {
      return '';
    }

    const start = this.formatShortDate(this.planning.startDate);
    const end = this.formatShortDate(this.planning.endDate);
    return `Week ${this.weekCode(this.planning.startDate)} (${start} - ${end})`;
  }

  dayName(date: string): string {
    const value = new Date(`${date}T00:00:00`);
    return value.toLocaleDateString('en-US', { weekday: 'long' });
  }

  trackByDate(index: number, item: { date: string }): string {
    return item.date;
  }

  cardColor(index: number): string {
    return this.cardColors[index % this.cardColors.length];
  }

  planningDays(): { date: string; label: string }[] {
    return (this.planning?.days ?? []).map(day => ({
      date: day.date,
      label: `${this.dayName(day.date)} (${day.date})`,
    }));
  }

  availablePeopleForDay(date: string): Person[] {
    const assigned = new Set(this.peopleForDay(date).map(item => item.person.id));
    return this.activePeople.filter(person => !assigned.has(person.id));
  }

  peopleForDay(date: string): DayPerson[] {
    return this.planning?.days.find(day => day.date === date)?.people ?? [];
  }

  projectsForPerson(date: string, personId: string): DayPersonProject[] {
    return this.peopleForDay(date).find(item => item.person.id === personId)?.projects ?? [];
  }

  tasksForProject(date: string, personId: string, projectId: string): Task[] {
    return this.projectsForPerson(date, personId).find(item => item.project.id === projectId)?.tasks ?? [];
  }

  availableProjectsForDayPerson(date: string, personId: string): Project[] {
    const assigned = new Set(this.projectsForPerson(date, personId).map(item => item.project.id));
    return this.activeProjects.filter(project => !assigned.has(project.id));
  }

  onAddProjectSelectionChanged(): void {
    this.syncAddProjectForm();
  }

  onAddPersonSelectionChanged(): void {
    const day = this.addPersonForm.controls.day.value;
    const options = this.availablePeopleForDay(day);
    const validPersonId = options.some(item => item.id === this.addPersonForm.controls.personId.value)
      ? this.addPersonForm.controls.personId.value
      : options[0]?.id ?? '';
    this.addPersonForm.patchValue({ personId: validPersonId });
  }

  onAddTaskSelectionChanged(): void {
    this.syncAddTaskForm();
  }

  onRemoveTaskSelectionChanged(): void {
    this.syncRemoveTaskForm();
  }

  onRemoveProjectSelectionChanged(): void {
    this.syncRemoveProjectForm();
  }

  onRemovePersonSelectionChanged(): void {
    this.syncRemovePersonForm();
  }

  async submitAddPerson(): Promise<void> {
    this.modalSubmitted.addPerson = true;
    this.errorMessage = '';

    if (this.addPersonForm.invalid) {
      return;
    }

    this.isSavingAction = true;

    try {
      await firstValueFrom(
        this.planningService.addPersonToDay(this.weekId, this.addPersonForm.controls.day.value, {
          personId: this.addPersonForm.controls.personId.value,
        }),
      );
      await this.afterPlanningAction();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
      this.isSavingAction = false;
    }
  }

  async submitAddProject(): Promise<void> {
    this.modalSubmitted.addProject = true;
    this.errorMessage = '';

    if (this.addProjectForm.invalid) {
      return;
    }

    this.isSavingAction = true;

    try {
      await firstValueFrom(
        this.planningService.addProjectToPerson(
          this.weekId,
          this.addProjectForm.controls.day.value,
          this.addProjectForm.controls.personId.value,
          { projectId: this.addProjectForm.controls.projectId.value },
        ),
      );
      await this.afterPlanningAction();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
      this.isSavingAction = false;
    }
  }

  async submitAddTask(): Promise<void> {
    this.modalSubmitted.addTask = true;
    this.errorMessage = '';

    if (this.addTaskForm.invalid) {
      return;
    }

    this.isSavingAction = true;

    try {
      await firstValueFrom(
        this.planningService.addTaskToProject(
          this.weekId,
          this.addTaskForm.controls.day.value,
          this.addTaskForm.controls.personId.value,
          this.addTaskForm.controls.projectId.value,
          { description: this.addTaskForm.controls.description.value.trim() },
        ),
      );
      await this.afterPlanningAction();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
      this.isSavingAction = false;
    }
  }

  async submitRemoveTask(): Promise<void> {
    this.modalSubmitted.removeTask = true;
    this.errorMessage = '';

    if (this.removeTaskForm.invalid) {
      return;
    }

    this.isSavingAction = true;

    try {
      await firstValueFrom(
        this.planningService.removeTaskFromProject(
          this.weekId,
          this.removeTaskForm.controls.day.value,
          this.removeTaskForm.controls.personId.value,
          this.removeTaskForm.controls.projectId.value,
          this.removeTaskForm.controls.taskId.value,
        ),
      );
      await this.afterPlanningAction();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
      this.isSavingAction = false;
    }
  }

  async submitRemovePerson(): Promise<void> {
    this.modalSubmitted.removePerson = true;
    this.errorMessage = '';

    if (this.removePersonForm.invalid) {
      return;
    }

    this.isSavingAction = true;

    try {
      await firstValueFrom(
        this.planningService.removePersonFromDay(
          this.weekId,
          this.removePersonForm.controls.day.value,
          this.removePersonForm.controls.personId.value,
        ),
      );
      await this.afterPlanningAction();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
      this.isSavingAction = false;
    }
  }

  async submitRemoveProject(): Promise<void> {
    this.modalSubmitted.removeProject = true;
    this.errorMessage = '';

    if (this.removeProjectForm.invalid) {
      return;
    }

    this.isSavingAction = true;

    try {
      await firstValueFrom(
        this.planningService.removeProjectFromPerson(
          this.weekId,
          this.removeProjectForm.controls.day.value,
          this.removeProjectForm.controls.personId.value,
          this.removeProjectForm.controls.projectId.value,
        ),
      );
      await this.afterPlanningAction();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
      this.isSavingAction = false;
    }
  }

  private resetModalForm(modalType: PlanningModalType): void {
    const firstDay = this.planningDays()[0]?.date ?? '';

    switch (modalType) {
      case 'addPerson': {
        this.addPersonForm.reset({
          day: firstDay,
          personId: this.availablePeopleForDay(firstDay)[0]?.id ?? '',
        });
        break;
      }
      case 'addProject': {
        this.addProjectForm.reset({
          day: firstDay,
          personId: this.peopleForDay(firstDay)[0]?.person.id ?? '',
          projectId: '',
        });
        this.syncAddProjectForm();
        break;
      }
      case 'addTask': {
        this.addTaskForm.reset({
          day: firstDay,
          personId: this.peopleForDay(firstDay)[0]?.person.id ?? '',
          projectId: '',
          description: '',
        });
        this.syncAddTaskForm();
        break;
      }
      case 'removeTask': {
        this.removeTaskForm.reset({
          day: firstDay,
          personId: this.peopleForDay(firstDay)[0]?.person.id ?? '',
          projectId: '',
          taskId: '',
        });
        this.syncRemoveTaskForm();
        break;
      }
      case 'removePerson': {
        this.removePersonForm.reset({
          day: firstDay,
          personId: this.peopleForDay(firstDay)[0]?.person.id ?? '',
        });
        this.syncRemovePersonForm();
        break;
      }
      case 'removeProject': {
        this.removeProjectForm.reset({
          day: firstDay,
          personId: this.peopleForDay(firstDay)[0]?.person.id ?? '',
          projectId: '',
        });
        this.syncRemoveProjectForm();
        break;
      }
    }
  }

  private syncAddProjectForm(): void {
    const day = this.addProjectForm.controls.day.value;
    const dayPeople = this.peopleForDay(day);
    const validPersonId = dayPeople.some(item => item.person.id === this.addProjectForm.controls.personId.value)
      ? this.addProjectForm.controls.personId.value
      : dayPeople[0]?.person.id ?? '';

    const projects = this.availableProjectsForDayPerson(day, validPersonId);
    const validProjectId = projects.some(item => item.id === this.addProjectForm.controls.projectId.value)
      ? this.addProjectForm.controls.projectId.value
      : projects[0]?.id ?? '';

    this.addProjectForm.patchValue({ personId: validPersonId, projectId: validProjectId });
  }

  private syncAddTaskForm(): void {
    const day = this.addTaskForm.controls.day.value;
    const dayPeople = this.peopleForDay(day);
    const validPersonId = dayPeople.some(item => item.person.id === this.addTaskForm.controls.personId.value)
      ? this.addTaskForm.controls.personId.value
      : dayPeople[0]?.person.id ?? '';

    const projects = this.projectsForPerson(day, validPersonId);
    const validProjectId = projects.some(item => item.project.id === this.addTaskForm.controls.projectId.value)
      ? this.addTaskForm.controls.projectId.value
      : projects[0]?.project.id ?? '';

    this.addTaskForm.patchValue({ personId: validPersonId, projectId: validProjectId });
  }

  private syncRemoveTaskForm(): void {
    const day = this.removeTaskForm.controls.day.value;
    const dayPeople = this.peopleForDay(day);
    const validPersonId = dayPeople.some(item => item.person.id === this.removeTaskForm.controls.personId.value)
      ? this.removeTaskForm.controls.personId.value
      : dayPeople[0]?.person.id ?? '';

    const projects = this.projectsForPerson(day, validPersonId);
    const validProjectId = projects.some(item => item.project.id === this.removeTaskForm.controls.projectId.value)
      ? this.removeTaskForm.controls.projectId.value
      : projects[0]?.project.id ?? '';

    const tasks = this.tasksForProject(day, validPersonId, validProjectId);
    const validTaskId = tasks.some(item => item.id === this.removeTaskForm.controls.taskId.value)
      ? this.removeTaskForm.controls.taskId.value
      : tasks[0]?.id ?? '';

    this.removeTaskForm.patchValue({
      personId: validPersonId,
      projectId: validProjectId,
      taskId: validTaskId,
    });
  }

  private syncRemovePersonForm(): void {
    const day = this.removePersonForm.controls.day.value;
    const dayPeople = this.peopleForDay(day);
    const validPersonId = dayPeople.some(item => item.person.id === this.removePersonForm.controls.personId.value)
      ? this.removePersonForm.controls.personId.value
      : dayPeople[0]?.person.id ?? '';

    this.removePersonForm.patchValue({ personId: validPersonId });
  }

  private syncRemoveProjectForm(): void {
    const day = this.removeProjectForm.controls.day.value;
    const dayPeople = this.peopleForDay(day);
    const validPersonId = dayPeople.some(item => item.person.id === this.removeProjectForm.controls.personId.value)
      ? this.removeProjectForm.controls.personId.value
      : dayPeople[0]?.person.id ?? '';

    const projects = this.projectsForPerson(day, validPersonId);
    const validProjectId = projects.some(item => item.project.id === this.removeProjectForm.controls.projectId.value)
      ? this.removeProjectForm.controls.projectId.value
      : projects[0]?.project.id ?? '';

    this.removeProjectForm.patchValue({ personId: validPersonId, projectId: validProjectId });
  }

  private async afterPlanningAction(): Promise<void> {
    await this.loadPlanning();
    this.closeModal();
  }

  private async loadPlanning(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      this.planning = await firstValueFrom(this.weeksService.getWeekPlanning(this.weekId));
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error);
      this.planning = null;
    } finally {
      this.isLoading = false;
    }
  }

  private async loadReferenceData(): Promise<void> {
    try {
      const [peopleResponse, projectResponse] = await Promise.all([
        firstValueFrom(this.peopleService.listPeople({ status: 'ACTIVE' })),
        firstValueFrom(this.projectsService.listProjects({ status: 'ACTIVE' })),
      ]);

      this.activePeople = peopleResponse.items;
      this.activeProjects = projectResponse.items;
    } catch {
      this.activePeople = [];
      this.activeProjects = [];
    }
  }

  private weekCode(startDate: string): string {
    const date = new Date(`${startDate}T00:00:00`);
    const year = date.getUTCFullYear();
    const week = this.isoWeekNumber(date);
    return `${year}-W${week.toString().padStart(2, '0')}`;
  }

  private formatShortDate(value: string): string {
    const date = new Date(`${value}T00:00:00`);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  private isoWeekNumber(date: Date): number {
    const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    const dayNumber = utcDate.getUTCDay() || 7;
    utcDate.setUTCDate(utcDate.getUTCDate() + 4 - dayNumber);
    const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
    return Math.ceil((((utcDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred.';
  }
}
