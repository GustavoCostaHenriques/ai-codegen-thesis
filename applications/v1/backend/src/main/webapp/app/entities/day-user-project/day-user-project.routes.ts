import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DayUserProjectResolve from './route/day-user-project-routing-resolve.service';

const dayUserProjectRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/day-user-project.component').then(m => m.DayUserProjectComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/day-user-project-detail.component').then(m => m.DayUserProjectDetailComponent),
    resolve: {
      dayUserProject: DayUserProjectResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/day-user-project-update.component').then(m => m.DayUserProjectUpdateComponent),
    resolve: {
      dayUserProject: DayUserProjectResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/day-user-project-update.component').then(m => m.DayUserProjectUpdateComponent),
    resolve: {
      dayUserProject: DayUserProjectResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dayUserProjectRoute;
