import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/components/auth/login.component';
import { PlanningComponent } from './features/components/planning/planning.component';
import { PersonManagementComponent } from './features/components/persons/person-management.component';
import { ProjectComponent } from './features/components/projects/project.component';
import { WeeksOverviewComponent } from './features/components/weeks/weeks-overview.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'weeks', component: WeeksOverviewComponent, canActivate: [authGuard] },
  { path: 'weeks/:weekId/planning', component: PlanningComponent, canActivate: [authGuard] },
  { path: 'persons', component: PersonManagementComponent, canActivate: [authGuard] },
  { path: 'projects', component: ProjectComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'weeks', pathMatch: 'full' },
  { path: '**', redirectTo: 'weeks' },
];
