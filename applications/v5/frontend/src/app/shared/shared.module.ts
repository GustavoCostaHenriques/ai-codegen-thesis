import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { GraPasswordToggleDirective } from './directives/gra-password-toggle.directive';
import { GraSimpleSelectDirective } from './directives/gra-simple-select.directive';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [
    TranslatePipe,
    TopNavComponent,
    GraSimpleSelectDirective,
    GraPasswordToggleDirective,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    CommonModule,
    RouterModule,
    TranslatePipe,
    TopNavComponent,
    GraSimpleSelectDirective,
    GraPasswordToggleDirective,
  ],
})
export class SharedModule {}
