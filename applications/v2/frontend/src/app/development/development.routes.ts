import { Routes } from '@angular/router';
import { AppShellComponent } from '../core/app-shell/app-shell.component';
import { authGuard } from '../core/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { PeopleManagementComponent } from './people/people-management/people-management.component';
import { ProjectManagementComponent } from './projects/project-management/project-management.component';
import { WeeklyPlanningComponent } from './weeks/weekly-planning/weekly-planning.component';
import { WeeksOverviewComponent } from './weeks/weeks-overview/weeks-overview.component';

const DEVELOPMENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: AppShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'weeks',
        children: [
          {
            path: '',
            component: WeeksOverviewComponent,
            data: {
              title: 'Weeks Overview',
            },
          },
          {
            path: ':weekId/planning',
            component: WeeklyPlanningComponent,
            data: {
              title: 'Weekly Planning',
            },
          },
        ],
      },
      {
        path: 'people',
        children: [
          {
            path: '',
            component: PeopleManagementComponent,
            data: {
              title: 'Person Management',
            },
          },
        ],
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            component: ProjectManagementComponent,
            data: {
              title: 'Project Management',
            },
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

export default DEVELOPMENT_ROUTES;
