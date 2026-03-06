import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PlanningRoutingModule } from './planning-routing.module';
import { PlanningBoardPageComponent } from './pages/planning-board-page/planning-board-page.component';

@NgModule({
  declarations: [PlanningBoardPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PlanningRoutingModule,
  ],
})
export class PlanningModule {}
