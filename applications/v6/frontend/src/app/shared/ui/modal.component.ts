import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <div *ngIf="open" class="gra-popup">
      <div class="popupMask" (click)="handleBackdrop()"></div>
      <div class="popupContainer" role="dialog" aria-modal="true" [attr.aria-label]="title">
        <div class="popupHeader" [ngClass]="{ 'no-border': hideHeaderBorder }">
          <div class="popupTitleBlock">
            <h2>{{ title }}</h2>
            <ng-content select="[modal-subtitle]"></ng-content>
          </div>
          <button
            *ngIf="showClose"
            type="button"
            class="icon icon-primary closePopup"
            aria-label="Close"
            (click)="close.emit()"
          >
            X
          </button>
        </div>

        <div class="popupContent">
          <ng-content></ng-content>
        </div>

        <div *ngIf="showFooter" class="popupFooter">
          <div class="gra-hr-horizontal-dark-s gra-padding-bottom-xs"></div>
          <ng-content select="[modal-footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() showFooter = true;
  @Input() showClose = true;
  @Input() hideHeaderBorder = false;
  @Input() closeOnBackdrop = false;
  @Output() readonly close = new EventEmitter<void>();

  handleBackdrop(): void {
    if (this.closeOnBackdrop) {
      this.close.emit();
    }
  }
}
