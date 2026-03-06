import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleManagementPageComponent } from './pages/people-management-page/people-management-page.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleManagementPageComponent,
    data: { titleKey: 'people.title' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleRoutingModule {}
