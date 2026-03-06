import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [NgClass],
  template: `<div class="gra-spinner" [ngClass]="size"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' | 'xLarge' = 'medium';
}
