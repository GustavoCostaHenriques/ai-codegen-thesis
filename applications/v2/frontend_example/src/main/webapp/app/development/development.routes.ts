import { Routes } from '@angular/router';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { DetailsTournamentComponent } from './tournaments/details-tournament/details-tournament.component';
import { CancelTournamentComponent } from './tournaments/cancel-tournament/cancel-tournament.component';

const DEVELOPMENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'tournaments',
    pathMatch: 'full',
  },
  {
    path: 'tournaments',
    children: [
      {
        path: '',
        component: TournamentsComponent,
      },
      {
        path: ':tournament-id',
        component: DetailsTournamentComponent,
      },
    ],
  },
];

export default DEVELOPMENT_ROUTES;
