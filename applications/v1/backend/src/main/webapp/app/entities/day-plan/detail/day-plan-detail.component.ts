import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatePipe } from 'app/shared/date';
import { IDayPlan } from '../day-plan.model';

@Component({
  selector: 'jhi-day-plan-detail',
  templateUrl: './day-plan-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatePipe],
})
export class DayPlanDetailComponent {
  dayPlan = input<IDayPlan | null>(null);

  previousState(): void {
    window.history.back();
  }
}
