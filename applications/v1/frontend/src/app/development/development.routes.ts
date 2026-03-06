import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectManagementComponent } from './projects/project-management/project-management.component';
import { UserManagementComponent } from './users/user-management/user-management.component';
import { WeeklyPlanningComponent } from './weeks/weekly-planning/weekly-planning.component';
import { WeeksOverviewComponent } from './weeks/weeks-overview/weeks-overview.component';

const DEVELOPMENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'weeks',
    children: [
      {
        path: '',
        component: WeeksOverviewComponent,
      },
      {
        path: ':weekId',
        children: [
          {
            path: 'days',
            component: WeeklyPlanningComponent,
          },
          {
            path: 'days/:date',
            component: WeeklyPlanningComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UserManagementComponent,
      },
      {
        path: ':userId',
        component: UserManagementComponent,
      },
    ],
  },
  {
    path: 'projects',
    children: [
      {
        path: '',
        component: ProjectManagementComponent,
      },
      {
        path: ':projectId',
        component: ProjectManagementComponent,
      },
    ],
  },
];

export default DEVELOPMENT_ROUTES;
