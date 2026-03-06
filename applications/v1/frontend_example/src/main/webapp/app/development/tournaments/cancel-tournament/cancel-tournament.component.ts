import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'jhi-cancel-tournament',
  imports: [MatDialogActions, MatDialogContent],
  templateUrl: './cancel-tournament.component.html',
  styleUrl: './cancel-tournament.component.scss',
})
export class CancelTournamentComponent {
  private readonly dialogRef = inject(MatDialogRef<CancelTournamentComponent>);

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
