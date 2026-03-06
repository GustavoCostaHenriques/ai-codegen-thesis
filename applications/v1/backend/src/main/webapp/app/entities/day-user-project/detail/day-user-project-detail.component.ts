import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IDayUserProject } from '../day-user-project.model';

@Component({
  selector: 'jhi-day-user-project-detail',
  templateUrl: './day-user-project-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class DayUserProjectDetailComponent {
  dayUserProject = input<IDayUserProject | null>(null);

  previousState(): void {
    window.history.back();
  }
}
