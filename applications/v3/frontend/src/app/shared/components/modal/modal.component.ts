import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() closeOnBackdrop = false;
  @Output() closeModal = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.closeModal.emit();
    }
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.closeModal.emit();
    }
  }
}
