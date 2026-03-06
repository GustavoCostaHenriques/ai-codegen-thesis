import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningBoardPageComponent } from './pages/planning-board-page/planning-board-page.component';

const routes: Routes = [
  {
    path: '',
    component: PlanningBoardPageComponent,
    data: { titleKey: 'app.planning' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanningRoutingModule {}
