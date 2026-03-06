import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-shell.component.html',
  styleUrl: './modal-shell.component.scss'
})
export class ModalShellComponent {
  @Input() title = '';
  @Input() dirty = false;
  @Output() closeRequested = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.tryClose();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.tryClose();
    }
  }

  tryClose(): void {
    if (this.dirty && !window.confirm('Discard unsaved changes?')) {
      return;
    }

    this.closeRequested.emit();
  }
}
