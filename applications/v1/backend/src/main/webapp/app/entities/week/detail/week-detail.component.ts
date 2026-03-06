import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatePipe } from 'app/shared/date';
import { IWeek } from '../week.model';

@Component({
  selector: 'jhi-week-detail',
  templateUrl: './week-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatePipe],
})
export class WeekDetailComponent {
  week = input<IWeek | null>(null);

  previousState(): void {
    window.history.back();
  }
}
