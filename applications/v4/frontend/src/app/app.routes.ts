import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/login-page.component';
import { PlanningPageComponent } from './features/planning/planning-page.component';
import { PersonsPageComponent } from './features/persons/persons-page.component';
import { ProjectsPageComponent } from './features/projects/projects-page.component';
import { WeeksPageComponent } from './features/weeks/weeks-page.component';
import { authGuard } from './core/guards/auth.guard';
import { publicOnlyGuard } from './core/guards/public-only.guard';
import { roleGuard } from './core/guards/role.guard';
import { MainLayoutComponent } from './shared/ui/main-layout.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [publicOnlyGuard]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'weeks',
        component: WeeksPageComponent,
        canActivate: [roleGuard],
        data: {
          title: 'Weeks Overview',
          active: 'weeks',
          roles: ['ADMIN', 'VIEWER']
        }
      },
      {
        path: 'weeks/:weekId/planning',
        component: PlanningPageComponent,
        canActivate: [roleGuard],
        data: {
          title: 'Weekly Planning',
          active: 'planning',
          roles: ['ADMIN', 'VIEWER']
        }
      },
      {
        path: 'persons',
        component: PersonsPageComponent,
        canActivate: [roleGuard],
        data: {
          title: 'Person Management',
          active: 'persons',
          roles: ['ADMIN', 'VIEWER']
        }
      },
      {
        path: 'projects',
        component: ProjectsPageComponent,
        canActivate: [roleGuard],
        data: {
          title: 'Project Management',
          active: 'projects',
          roles: ['ADMIN', 'VIEWER']
        }
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'weeks'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
