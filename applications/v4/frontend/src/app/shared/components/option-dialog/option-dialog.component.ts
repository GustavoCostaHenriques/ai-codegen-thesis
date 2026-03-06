import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface OptionItem<T extends string = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-option-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option-dialog.component.html',
  styleUrl: './option-dialog.component.scss'
})
export class OptionDialogComponent<T extends string = string> {
  @Input() options: OptionItem<T>[] = [];
  @Input() activeValue?: T;
  @Output() selected = new EventEmitter<T>();

  select(option: OptionItem<T>): void {
    this.selected.emit(option.value);
  }
}
