import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IWeek } from '../week.model';
import { WeekService } from '../service/week.service';

@Component({
  templateUrl: './week-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class WeekDeleteDialogComponent {
  week?: IWeek;

  protected weekService = inject(WeekService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.weekService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
