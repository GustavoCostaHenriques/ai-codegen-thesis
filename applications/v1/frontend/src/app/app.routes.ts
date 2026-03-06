import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./development/development.routes'),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
