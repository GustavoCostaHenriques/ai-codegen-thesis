import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeeksOverviewPageComponent } from './pages/weeks-overview-page/weeks-overview-page.component';

const routes: Routes = [
  {
    path: '',
    component: WeeksOverviewPageComponent,
    data: { titleKey: 'weeks.title' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeeksRoutingModule {}
