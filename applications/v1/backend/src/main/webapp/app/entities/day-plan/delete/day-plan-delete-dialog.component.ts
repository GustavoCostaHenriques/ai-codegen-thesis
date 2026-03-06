import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDayPlan } from '../day-plan.model';
import { DayPlanService } from '../service/day-plan.service';

@Component({
  templateUrl: './day-plan-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DayPlanDeleteDialogComponent {
  dayPlan?: IDayPlan;

  protected dayPlanService = inject(DayPlanService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dayPlanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
