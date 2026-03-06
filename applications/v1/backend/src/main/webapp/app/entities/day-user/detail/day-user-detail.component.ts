import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IDayUser } from '../day-user.model';

@Component({
  selector: 'jhi-day-user-detail',
  templateUrl: './day-user-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class DayUserDetailComponent {
  dayUser = input<IDayUser | null>(null);

  previousState(): void {
    window.history.back();
  }
}
