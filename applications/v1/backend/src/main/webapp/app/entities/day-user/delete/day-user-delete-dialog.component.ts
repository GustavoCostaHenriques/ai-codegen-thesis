import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDayUser } from '../day-user.model';
import { DayUserService } from '../service/day-user.service';

@Component({
  templateUrl: './day-user-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DayUserDeleteDialogComponent {
  dayUser?: IDayUser;

  protected dayUserService = inject(DayUserService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dayUserService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
