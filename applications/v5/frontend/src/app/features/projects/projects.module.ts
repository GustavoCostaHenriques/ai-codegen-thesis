import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectManagementPageComponent } from './pages/project-management-page/project-management-page.component';

@NgModule({
  declarations: [ProjectManagementPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProjectsRoutingModule,
  ],
})
export class ProjectsModule {}
