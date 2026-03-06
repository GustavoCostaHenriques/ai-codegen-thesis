import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IStudentAddress } from '../student-address.model';
import { StudentAddressService } from '../service/student-address.service';

@Component({
  templateUrl: './student-address-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class StudentAddressDeleteDialogComponent {
  studentAddress?: IStudentAddress;

  protected studentAddressService = inject(StudentAddressService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.studentAddressService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
