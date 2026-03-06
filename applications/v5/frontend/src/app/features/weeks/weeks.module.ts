import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { WeeksRoutingModule } from './weeks-routing.module';
import { WeeksOverviewPageComponent } from './pages/weeks-overview-page/weeks-overview-page.component';

@NgModule({
  declarations: [WeeksOverviewPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    WeeksRoutingModule,
  ],
})
export class WeeksModule {}
