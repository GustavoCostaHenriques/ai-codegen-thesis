import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'disciplina',
    data: { pageTitle: 'escolaApp.disciplina.home.title' },
    loadChildren: () => import('./disciplina/disciplina.routes'),
  },
  {
    path: 'course',
    data: { pageTitle: 'escolaApp.course.home.title' },
    loadChildren: () => import('./course/course.routes'),
  },
  {
    path: 'student',
    data: { pageTitle: 'escolaApp.student.home.title' },
    loadChildren: () => import('./student/student.routes'),
  },
  {
    path: 'student-address',
    data: { pageTitle: 'escolaApp.studentAddress.home.title' },
    loadChildren: () => import('./student-address/student-address.routes'),
  },
  {
    path: 'grade',
    data: { pageTitle: 'escolaApp.grade.home.title' },
    loadChildren: () => import('./grade/grade.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
