import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { AppShellComponent } from './layout/app-shell.component';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login-page.component').then((module) => module.LoginPageComponent),
    data: {
      title: 'app.login',
    },
  },
  {
    path: '',
    component: AppShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'weeks',
        loadComponent: () => import('./features/weeks/weeks-page.component').then((module) => module.WeeksPageComponent),
        data: {
          title: 'app.weeks',
        },
      },
      {
        path: 'weeks/:weekId/planning',
        loadComponent: () => import('./features/planning/planning-page.component').then((module) => module.PlanningPageComponent),
        data: {
          title: 'app.backoffice',
        },
      },
      {
        path: 'people',
        loadComponent: () => import('./features/people/people-page.component').then((module) => module.PeoplePageComponent),
        data: {
          title: 'app.people',
        },
      },
      {
        path: 'projects',
        loadComponent: () => import('./features/projects/projects-page.component').then((module) => module.ProjectsPageComponent),
        data: {
          title: 'app.projects',
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'weeks',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'weeks',
  },
  {
    path: '**',
    redirectTo: 'weeks',
  },
];
