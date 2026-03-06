import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAppUser } from 'app/entities/app-user/app-user.model';
import { AppUserService } from 'app/entities/app-user/service/app-user.service';
import { IDayPlan } from 'app/entities/day-plan/day-plan.model';
import { DayPlanService } from 'app/entities/day-plan/service/day-plan.service';
import { DayUserService } from '../service/day-user.service';
import { IDayUser } from '../day-user.model';
import { DayUserFormGroup, DayUserFormService } from './day-user-form.service';

@Component({
  selector: 'jhi-day-user-update',
  templateUrl: './day-user-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DayUserUpdateComponent implements OnInit {
  isSaving = false;
  dayUser: IDayUser | null = null;

  appUsersSharedCollection: IAppUser[] = [];
  dayPlansSharedCollection: IDayPlan[] = [];

  protected dayUserService = inject(DayUserService);
  protected dayUserFormService = inject(DayUserFormService);
  protected appUserService = inject(AppUserService);
  protected dayPlanService = inject(DayPlanService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DayUserFormGroup = this.dayUserFormService.createDayUserFormGroup();

  compareAppUser = (o1: IAppUser | null, o2: IAppUser | null): boolean => this.appUserService.compareAppUser(o1, o2);

  compareDayPlan = (o1: IDayPlan | null, o2: IDayPlan | null): boolean => this.dayPlanService.compareDayPlan(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dayUser }) => {
      this.dayUser = dayUser;
      if (dayUser) {
        this.updateForm(dayUser);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dayUser = this.dayUserFormService.getDayUser(this.editForm);
    if (dayUser.id !== null) {
      this.subscribeToSaveResponse(this.dayUserService.update(dayUser));
    } else {
      this.subscribeToSaveResponse(this.dayUserService.create(dayUser));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDayUser>>): void {
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

  protected updateForm(dayUser: IDayUser): void {
    this.dayUser = dayUser;
    this.dayUserFormService.resetForm(this.editForm, dayUser);

    this.appUsersSharedCollection = this.appUserService.addAppUserToCollectionIfMissing<IAppUser>(
      this.appUsersSharedCollection,
      dayUser.user,
    );
    this.dayPlansSharedCollection = this.dayPlanService.addDayPlanToCollectionIfMissing<IDayPlan>(
      this.dayPlansSharedCollection,
      dayUser.dayPlan,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.appUserService
      .query()
      .pipe(map((res: HttpResponse<IAppUser[]>) => res.body ?? []))
      .pipe(map((appUsers: IAppUser[]) => this.appUserService.addAppUserToCollectionIfMissing<IAppUser>(appUsers, this.dayUser?.user)))
      .subscribe((appUsers: IAppUser[]) => (this.appUsersSharedCollection = appUsers));

    this.dayPlanService
      .query()
      .pipe(map((res: HttpResponse<IDayPlan[]>) => res.body ?? []))
      .pipe(map((dayPlans: IDayPlan[]) => this.dayPlanService.addDayPlanToCollectionIfMissing<IDayPlan>(dayPlans, this.dayUser?.dayPlan)))
      .subscribe((dayPlans: IDayPlan[]) => (this.dayPlansSharedCollection = dayPlans));
  }
}
