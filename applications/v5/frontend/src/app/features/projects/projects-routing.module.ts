import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagementPageComponent } from './pages/project-management-page/project-management-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectManagementPageComponent,
    data: { titleKey: 'projects.title' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
