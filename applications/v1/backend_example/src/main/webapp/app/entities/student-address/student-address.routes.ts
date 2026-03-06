import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import StudentAddressResolve from './route/student-address-routing-resolve.service';

const studentAddressRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/student-address.component').then(m => m.StudentAddressComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/student-address-detail.component').then(m => m.StudentAddressDetailComponent),
    resolve: {
      studentAddress: StudentAddressResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/student-address-update.component').then(m => m.StudentAddressUpdateComponent),
    resolve: {
      studentAddress: StudentAddressResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/student-address-update.component').then(m => m.StudentAddressUpdateComponent),
    resolve: {
      studentAddress: StudentAddressResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default studentAddressRoute;
