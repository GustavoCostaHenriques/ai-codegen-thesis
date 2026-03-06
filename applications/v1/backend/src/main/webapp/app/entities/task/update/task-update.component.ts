import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDayUserProject } from 'app/entities/day-user-project/day-user-project.model';
import { DayUserProjectService } from 'app/entities/day-user-project/service/day-user-project.service';
import { ITask } from '../task.model';
import { TaskService } from '../service/task.service';
import { TaskFormGroup, TaskFormService } from './task-form.service';

@Component({
  selector: 'jhi-task-update',
  templateUrl: './task-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaskUpdateComponent implements OnInit {
  isSaving = false;
  task: ITask | null = null;

  dayUserProjectsSharedCollection: IDayUserProject[] = [];

  protected taskService = inject(TaskService);
  protected taskFormService = inject(TaskFormService);
  protected dayUserProjectService = inject(DayUserProjectService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaskFormGroup = this.taskFormService.createTaskFormGroup();

  compareDayUserProject = (o1: IDayUserProject | null, o2: IDayUserProject | null): boolean =>
    this.dayUserProjectService.compareDayUserProject(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task }) => {
      this.task = task;
      if (task) {
        this.updateForm(task);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const task = this.taskFormService.getTask(this.editForm);
    if (task.id !== null) {
      this.subscribeToSaveResponse(this.taskService.update(task));
    } else {
      this.subscribeToSaveResponse(this.taskService.create(task));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(task: ITask): void {
    this.task = task;
    this.taskFormService.resetForm(this.editForm, task);

    this.dayUserProjectsSharedCollection = this.dayUserProjectService.addDayUserProjectToCollectionIfMissing<IDayUserProject>(
      this.dayUserProjectsSharedCollection,
      task.dayUserProject,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.dayUserProjectService
      .query()
      .pipe(map((res: HttpResponse<IDayUserProject[]>) => res.body ?? []))
      .pipe(
        map((dayUserProjects: IDayUserProject[]) =>
          this.dayUserProjectService.addDayUserProjectToCollectionIfMissing<IDayUserProject>(dayUserProjects, this.task?.dayUserProject),
        ),
      )
      .subscribe((dayUserProjects: IDayUserProject[]) => (this.dayUserProjectsSharedCollection = dayUserProjects));
  }
}
