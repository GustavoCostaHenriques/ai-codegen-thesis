import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IGrade } from '../grade.model';

@Component({
  selector: 'jhi-grade-detail',
  templateUrl: './grade-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class GradeDetailComponent {
  grade = input<IGrade | null>(null);

  previousState(): void {
    window.history.back();
  }
}
