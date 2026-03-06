import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleManagementPageComponent } from './pages/people-management-page/people-management-page.component';

@NgModule({
  declarations: [PeopleManagementPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PeopleRoutingModule,
  ],
})
export class PeopleModule {}
