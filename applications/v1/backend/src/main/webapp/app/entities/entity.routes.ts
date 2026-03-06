import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'app-user',
    data: { pageTitle: 'weeklyplanningApp.appUser.home.title' },
    loadChildren: () => import('./app-user/app-user.routes'),
  },
  {
    path: 'project',
    data: { pageTitle: 'weeklyplanningApp.project.home.title' },
    loadChildren: () => import('./project/project.routes'),
  },
  {
    path: 'week',
    data: { pageTitle: 'weeklyplanningApp.week.home.title' },
    loadChildren: () => import('./week/week.routes'),
  },
  {
    path: 'day-plan',
    data: { pageTitle: 'weeklyplanningApp.dayPlan.home.title' },
    loadChildren: () => import('./day-plan/day-plan.routes'),
  },
  {
    path: 'day-user',
    data: { pageTitle: 'weeklyplanningApp.dayUser.home.title' },
    loadChildren: () => import('./day-user/day-user.routes'),
  },
  {
    path: 'day-user-project',
    data: { pageTitle: 'weeklyplanningApp.dayUserProject.home.title' },
    loadChildren: () => import('./day-user-project/day-user-project.routes'),
  },
  {
    path: 'task',
    data: { pageTitle: 'weeklyplanningApp.task.home.title' },
    loadChildren: () => import('./task/task.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
