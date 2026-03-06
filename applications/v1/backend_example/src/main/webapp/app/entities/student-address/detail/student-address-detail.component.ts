import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IStudentAddress } from '../student-address.model';

@Component({
  selector: 'jhi-student-address-detail',
  templateUrl: './student-address-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class StudentAddressDetailComponent {
  studentAddress = input<IStudentAddress | null>(null);

  previousState(): void {
    window.history.back();
  }
}
