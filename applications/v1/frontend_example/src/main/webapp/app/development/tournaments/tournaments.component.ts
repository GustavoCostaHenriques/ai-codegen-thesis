import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TournamentsService, TournamentStats } from '../services/tournaments.service';
import { initTableOption } from './commons/initTableOption.function';
import { ColumnsSchema, DynamicTableComponent, TableButton } from '@trustsystems/dynamic-lib';
import { MatDialog } from '@angular/material/dialog';
import { AddTournamentComponent } from './add-tournament/add-tournament.component';
import { Router } from '@angular/router';
import { CancelTournamentComponent } from './cancel-tournament/cancel-tournament.component';

@Component({
  selector: 'jhi-tournaments',
  imports: [DynamicTableComponent],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.scss',
})
export class TournamentsComponent implements OnInit, OnDestroy {
  readonly subs: Subscription[] = [];

  // Loaders
  public isLoading = true;
  public isLoadingData = true;
  public isLoadingTable = true;

  // Injecters
  private readonly dialog = inject(MatDialog);
  private readonly tournamentsService = inject(TournamentsService);
  private readonly router = inject(Router);

  // Table variables
  public buttonsArray: TableButton[] = [];
  public displayedColumns: string[] = [];
  public columnsSchema: ColumnsSchema[] = [];

  // Data variable
  public tournaments: TournamentStats[] = [];

  // Initialization
  ngOnInit(): void {
    this.initRequest();
    this.getData();
    this.initTable();
  }

  initRequest(): void {
    this.subs.push(
      this.tournamentsService.getAllTournaments$.subscribe(data => {
        this.tournaments = data.filter(t => t.active);
        this.isLoadingData = false;
        this.dataArrived();
      }),
    );
  }

  getData(): void {
    this.tournamentsService.getAllTournaments();
  }

  initTable(): void {
    const tableOptions = initTableOption(this.goToDetails, this.goToCancel);
    this.buttonsArray = tableOptions.buttonsArray;
    this.displayedColumns = tableOptions.displayColumns;
    this.columnsSchema = tableOptions.columnsSchema;
    this.isLoadingTable = false;
  }

  dataArrived(): void {
    if (!this.isLoadingData) {
      this.isLoading = false;
    }
  }

  // Dialog
  openAddTournamentDialog(): void {
    const dialogRef = this.dialog.open(AddTournamentComponent, {
      width: '600px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.active) {
        this.tournamentsService.createTournament(result);
      }
    });
  }

  // Cancel a tournament
  goToCancel = (row: TournamentStats): void => {
    const dialogRef = this.dialog.open(CancelTournamentComponent, {
      width: '600px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.tournamentsService.deleteTournament(row.id);
      }
    });
  };

  // Change path to change details of a tournament
  goToDetails = (row: TournamentStats): void => {
    this.router.navigate(['/tournaments', row.id]);
  };

  // Destroy
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
