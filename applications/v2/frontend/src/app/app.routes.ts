import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./development/development.routes'),
  },
];

export default routes;
