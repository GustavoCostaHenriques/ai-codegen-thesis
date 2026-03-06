import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface TournamentStats {
  id: number;
  name: string;
  location: string;
  category: TournamentCategory;
  prize: number;
  active: boolean;
}
export enum TournamentCategory {
  GRAND_SLAM = 'Grand Slam',
  ATP_1000 = 'ATP 1000',
  ATP_500 = 'ATP 500',
  ATP_250 = 'ATP 250',
  CHALLENGER = 'Challenger',
  EXIBITION = 'Exibition',
  FINALS = 'ATP Finals',
  NEXTGEN = 'Next Gen Finals',
}
@Injectable({
  providedIn: 'root',
})
export class TournamentsService {
  private nextId = 7;
  stats: TournamentStats[] = [
    {
      id: 1,
      name: 'Australian Open',
      location: 'Melbourne',
      category: TournamentCategory.GRAND_SLAM,
      prize: 2500000,
      active: true,
    },
    {
      id: 2,
      name: 'Roland Garros',
      location: 'Paris',
      category: TournamentCategory.GRAND_SLAM,
      prize: 2300000,
      active: true,
    },
    {
      id: 3,
      name: 'Wimbledon',
      location: 'London',
      category: TournamentCategory.GRAND_SLAM,
      prize: 2800000,
      active: true,
    },
    {
      id: 4,
      name: 'US Open',
      location: 'New York',
      category: TournamentCategory.GRAND_SLAM,
      prize: 2600000,
      active: false,
    },
    {
      id: 5,
      name: 'Madrid Open',
      location: 'Madrid',
      category: TournamentCategory.ATP_1000,
      prize: 1000000,
      active: true,
    },
    {
      id: 6,
      name: 'Estoril Open',
      location: 'Cascais',
      category: TournamentCategory.ATP_250,
      prize: 450000,
      active: true,
    },
  ];

  getAllTournaments$ = new Subject<TournamentStats[]>();
  getTournamentsById$ = new Subject<TournamentStats>();
  createTournament$ = new Subject<TournamentStats>();
  updateTournament$ = new Subject<TournamentStats>();

  constructor() {}

  getAllTournaments(): void {
    this.getAllTournaments$.next(this.stats);
  }

  getTournamentsById(id: number): void {
    const tournament = this.stats.find(stat => stat.id === Number(id));

    if (tournament) {
      this.getTournamentsById$.next(tournament);
    } else {
      console.warn(`Tournament with ID ${id} not found.`);
    }
  }

  createTournament(tournament: TournamentStats): void {
    const newTournament = {
      ...tournament,
      id: this.nextId++,
    };

    this.stats.push(newTournament);
    this.createTournament$.next(newTournament);
    this.getAllTournaments$.next(this.stats);
  }

  updateTournament(tournament: TournamentStats): void {
    const index = this.stats.findIndex(t => t.id === Number(tournament.id));

    if (index !== -1) {
      this.stats[index] = { ...this.stats[index], ...tournament };
    }
    this.getAllTournaments$.next([...this.stats]);
  }

  deleteTournament(id: number): void {
    this.stats = this.stats.filter(t => t.id !== id);

    this.getAllTournaments$.next([...this.stats]);
  }
}
