import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DayUserResolve from './route/day-user-routing-resolve.service';

const dayUserRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/day-user.component').then(m => m.DayUserComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/day-user-detail.component').then(m => m.DayUserDetailComponent),
    resolve: {
      dayUser: DayUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/day-user-update.component').then(m => m.DayUserUpdateComponent),
    resolve: {
      dayUser: DayUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/day-user-update.component').then(m => m.DayUserUpdateComponent),
    resolve: {
      dayUser: DayUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dayUserRoute;
