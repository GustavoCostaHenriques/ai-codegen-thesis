import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { TournamentCategory } from 'app/development/services/tournaments.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jhi-add-tournament',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule,
    TranslatePipe,
    MatDialogActions,
    MatDialogContent,
  ],
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.scss'],
})
export class AddTournamentComponent {
  tournamentForm: FormGroup;
  categories = Object.values(TournamentCategory);
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<AddTournamentComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.tournamentForm = this.fb.group({
      name: [this.data?.row?.name ?? '', [Validators.required, Validators.minLength(3)]],
      location: [this.data?.row?.location ?? '', [Validators.required, Validators.minLength(3)]],
      category: [this.data?.row?.category ?? '', Validators.required],
      prize: [this.data?.row?.prize ?? '', [Validators.required, Validators.min(100000)]],
      active: [this.data?.row?.active ?? true],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.tournamentForm.valid) {
      this.dialogRef.close(this.tournamentForm.getRawValue());
    } else {
      this.tournamentForm.markAllAsTouched();
    }
  }
}
