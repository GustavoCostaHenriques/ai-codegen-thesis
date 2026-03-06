import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDayUserProject } from '../day-user-project.model';
import { DayUserProjectService } from '../service/day-user-project.service';

@Component({
  templateUrl: './day-user-project-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DayUserProjectDeleteDialogComponent {
  dayUserProject?: IDayUserProject;

  protected dayUserProjectService = inject(DayUserProjectService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dayUserProjectService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
