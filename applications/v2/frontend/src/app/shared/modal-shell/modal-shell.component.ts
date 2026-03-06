import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-shell',
  imports: [CommonModule],
  templateUrl: './modal-shell.component.html',
  styleUrl: './modal-shell.component.css',
})
export class ModalShellComponent {
  @Input() title = '';
  @Input() width = '560px';
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }
}
