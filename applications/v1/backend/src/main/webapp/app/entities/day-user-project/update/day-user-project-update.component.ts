import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDayUser } from 'app/entities/day-user/day-user.model';
import { DayUserService } from 'app/entities/day-user/service/day-user.service';
import { IProject } from 'app/entities/project/project.model';
import { ProjectService } from 'app/entities/project/service/project.service';
import { DayUserProjectService } from '../service/day-user-project.service';
import { IDayUserProject } from '../day-user-project.model';
import { DayUserProjectFormGroup, DayUserProjectFormService } from './day-user-project-form.service';

@Component({
  selector: 'jhi-day-user-project-update',
  templateUrl: './day-user-project-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DayUserProjectUpdateComponent implements OnInit {
  isSaving = false;
  dayUserProject: IDayUserProject | null = null;

  dayUsersSharedCollection: IDayUser[] = [];
  projectsSharedCollection: IProject[] = [];

  protected dayUserProjectService = inject(DayUserProjectService);
  protected dayUserProjectFormService = inject(DayUserProjectFormService);
  protected dayUserService = inject(DayUserService);
  protected projectService = inject(ProjectService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DayUserProjectFormGroup = this.dayUserProjectFormService.createDayUserProjectFormGroup();

  compareDayUser = (o1: IDayUser | null, o2: IDayUser | null): boolean => this.dayUserService.compareDayUser(o1, o2);

  compareProject = (o1: IProject | null, o2: IProject | null): boolean => this.projectService.compareProject(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dayUserProject }) => {
      this.dayUserProject = dayUserProject;
      if (dayUserProject) {
        this.updateForm(dayUserProject);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dayUserProject = this.dayUserProjectFormService.getDayUserProject(this.editForm);
    if (dayUserProject.id !== null) {
      this.subscribeToSaveResponse(this.dayUserProjectService.update(dayUserProject));
    } else {
      this.subscribeToSaveResponse(this.dayUserProjectService.create(dayUserProject));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDayUserProject>>): void {
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

  protected updateForm(dayUserProject: IDayUserProject): void {
    this.dayUserProject = dayUserProject;
    this.dayUserProjectFormService.resetForm(this.editForm, dayUserProject);

    this.dayUsersSharedCollection = this.dayUserService.addDayUserToCollectionIfMissing<IDayUser>(
      this.dayUsersSharedCollection,
      dayUserProject.dayUser,
    );
    this.projectsSharedCollection = this.projectService.addProjectToCollectionIfMissing<IProject>(
      this.projectsSharedCollection,
      dayUserProject.project,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.dayUserService
      .query()
      .pipe(map((res: HttpResponse<IDayUser[]>) => res.body ?? []))
      .pipe(
        map((dayUsers: IDayUser[]) =>
          this.dayUserService.addDayUserToCollectionIfMissing<IDayUser>(dayUsers, this.dayUserProject?.dayUser),
        ),
      )
      .subscribe((dayUsers: IDayUser[]) => (this.dayUsersSharedCollection = dayUsers));

    this.projectService
      .query()
      .pipe(map((res: HttpResponse<IProject[]>) => res.body ?? []))
      .pipe(
        map((projects: IProject[]) =>
          this.projectService.addProjectToCollectionIfMissing<IProject>(projects, this.dayUserProject?.project),
        ),
      )
      .subscribe((projects: IProject[]) => (this.projectsSharedCollection = projects));
  }
}
