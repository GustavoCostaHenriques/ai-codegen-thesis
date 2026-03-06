import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DayPlanResolve from './route/day-plan-routing-resolve.service';

const dayPlanRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/day-plan.component').then(m => m.DayPlanComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/day-plan-detail.component').then(m => m.DayPlanDetailComponent),
    resolve: {
      dayPlan: DayPlanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/day-plan-update.component').then(m => m.DayPlanUpdateComponent),
    resolve: {
      dayPlan: DayPlanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/day-plan-update.component').then(m => m.DayPlanUpdateComponent),
    resolve: {
      dayPlan: DayPlanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dayPlanRoute;
