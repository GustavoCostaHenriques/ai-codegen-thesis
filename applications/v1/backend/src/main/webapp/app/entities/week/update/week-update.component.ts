import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IWeek } from '../week.model';
import { WeekService } from '../service/week.service';
import { WeekFormGroup, WeekFormService } from './week-form.service';

@Component({
  selector: 'jhi-week-update',
  templateUrl: './week-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class WeekUpdateComponent implements OnInit {
  isSaving = false;
  week: IWeek | null = null;

  protected weekService = inject(WeekService);
  protected weekFormService = inject(WeekFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: WeekFormGroup = this.weekFormService.createWeekFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ week }) => {
      this.week = week;
      if (week) {
        this.updateForm(week);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const week = this.weekFormService.getWeek(this.editForm);
    if (week.id !== null) {
      this.subscribeToSaveResponse(this.weekService.update(week));
    } else {
      this.subscribeToSaveResponse(this.weekService.create(week));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWeek>>): void {
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

  protected updateForm(week: IWeek): void {
    this.week = week;
    this.weekFormService.resetForm(this.editForm, week);
  }
}
