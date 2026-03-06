import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import WeekResolve from './route/week-routing-resolve.service';

const weekRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/week.component').then(m => m.WeekComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/week-detail.component').then(m => m.WeekDetailComponent),
    resolve: {
      week: WeekResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/week-update.component').then(m => m.WeekUpdateComponent),
    resolve: {
      week: WeekResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/week-update.component').then(m => m.WeekUpdateComponent),
    resolve: {
      week: WeekResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default weekRoute;
