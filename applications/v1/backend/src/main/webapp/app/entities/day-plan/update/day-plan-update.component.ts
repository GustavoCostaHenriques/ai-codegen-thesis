import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IWeek } from 'app/entities/week/week.model';
import { WeekService } from 'app/entities/week/service/week.service';
import { IDayPlan } from '../day-plan.model';
import { DayPlanService } from '../service/day-plan.service';
import { DayPlanFormGroup, DayPlanFormService } from './day-plan-form.service';

@Component({
  selector: 'jhi-day-plan-update',
  templateUrl: './day-plan-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DayPlanUpdateComponent implements OnInit {
  isSaving = false;
  dayPlan: IDayPlan | null = null;

  weeksSharedCollection: IWeek[] = [];

  protected dayPlanService = inject(DayPlanService);
  protected dayPlanFormService = inject(DayPlanFormService);
  protected weekService = inject(WeekService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DayPlanFormGroup = this.dayPlanFormService.createDayPlanFormGroup();

  compareWeek = (o1: IWeek | null, o2: IWeek | null): boolean => this.weekService.compareWeek(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dayPlan }) => {
      this.dayPlan = dayPlan;
      if (dayPlan) {
        this.updateForm(dayPlan);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dayPlan = this.dayPlanFormService.getDayPlan(this.editForm);
    if (dayPlan.id !== null) {
      this.subscribeToSaveResponse(this.dayPlanService.update(dayPlan));
    } else {
      this.subscribeToSaveResponse(this.dayPlanService.create(dayPlan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDayPlan>>): void {
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

  protected updateForm(dayPlan: IDayPlan): void {
    this.dayPlan = dayPlan;
    this.dayPlanFormService.resetForm(this.editForm, dayPlan);

    this.weeksSharedCollection = this.weekService.addWeekToCollectionIfMissing<IWeek>(this.weeksSharedCollection, dayPlan.week);
  }

  protected loadRelationshipsOptions(): void {
    this.weekService
      .query()
      .pipe(map((res: HttpResponse<IWeek[]>) => res.body ?? []))
      .pipe(map((weeks: IWeek[]) => this.weekService.addWeekToCollectionIfMissing<IWeek>(weeks, this.dayPlan?.week)))
      .subscribe((weeks: IWeek[]) => (this.weeksSharedCollection = weeks));
  }
}
