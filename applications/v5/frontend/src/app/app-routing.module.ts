import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { ShellComponent } from './features/shell/shell.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [GuestGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'weeks/:weekId/planning',
        loadChildren: () =>
          import('./features/planning/planning.module').then(
            (m) => m.PlanningModule
          ),
      },
      {
        path: 'weeks',
        loadChildren: () =>
          import('./features/weeks/weeks.module').then((m) => m.WeeksModule),
      },
      {
        path: 'people',
        loadChildren: () =>
          import('./features/people/people.module').then((m) => m.PeopleModule),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./features/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'weeks',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
