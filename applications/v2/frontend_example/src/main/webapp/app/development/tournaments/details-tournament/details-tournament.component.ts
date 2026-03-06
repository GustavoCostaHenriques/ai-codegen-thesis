import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormComponent, FormFieldsType } from '@trustsystems/dynamic-lib';
import { TournamentsService, TournamentStats } from 'app/development/services/tournaments.service';
import { Subscription } from 'rxjs';
import { TournamentForm } from '../commons/tournamentForm.function';

@Component({
  selector: 'jhi-details-tournament',
  imports: [DynamicFormComponent],
  templateUrl: './details-tournament.component.html',
  styleUrl: './details-tournament.component.scss',
})
export class DetailsTournamentComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicFormComponent) form?: DynamicFormComponent;

  readonly subs: Subscription[] = [];

  // Loaders
  public isLoading = true;
  public isLoadingTournamentStats = true;

  // Public Variables
  public tournamentId?: number;
  public tournamentStats?: TournamentStats;
  public formFields: Array<FormFieldsType>[] = [];

  // Injecters
  private readonly tournamentsService = inject(TournamentsService);
  private readonly router = inject(ActivatedRoute);
  private readonly route = inject(Router);

  // Initialization
  ngOnInit(): void {
    this.tournamentId = this.router.snapshot.params['tournament-id'];
    this.initRequest();
    this.getData();
  }

  initRequest(): void {
    this.subs.push(
      this.tournamentsService.getTournamentsById$.subscribe(data => {
        this.tournamentStats = data;
        this.isLoadingTournamentStats = false;
        this.dataArrived();
      }),
    );
  }

  getData(): void {
    if (this.tournamentId) {
      this.tournamentsService.getTournamentsById(this.tournamentId);
    }
  }

  dataArrived(): void {
    if (!this.isLoadingTournamentStats) {
      this.initForms();
      this.isLoading = false;
    }
  }

  initForms(): void {
    this.formFields = TournamentForm();
  }

  disableSaveButton(): boolean {
    return this.form?.form.invalid ?? true;
  }

  // Save changes
  onSave(): void {
    if (!this.form) {
      return;
    }

    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
      return;
    }

    const updatedTournament = {
      ...this.form.form.getRawValue(),
      id: this.tournamentId,
    };

    this.tournamentsService.updateTournament(updatedTournament);

    this.route.navigate(['/tournaments']);
  }

  // Get Back
  goBack(): void {
    this.route.navigate(['/tournaments']);
  }

  // Destroy
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
