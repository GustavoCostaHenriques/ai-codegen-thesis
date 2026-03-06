import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '../pipes/t.pipe';

export interface SelectOption {
  value: string;
  label?: string;
  labelKey?: string;
  placeholder?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="gra-select-shell" [class.open]="open" [class.disabled]="disabled">
      <button
        type="button"
        class="gra-select-trigger"
        [class.placeholder]="selectedOption?.placeholder"
        [disabled]="disabled"
        [id]="inputId"
        [attr.aria-expanded]="open"
        [attr.aria-label]="ariaLabel || null"
        (click)="toggle()"
        (blur)="markTouched()"
      >
        <span>
          <ng-container *ngIf="selectedOption as option">
            {{ option.labelKey ? (option.labelKey | t) : option.label }}
          </ng-container>
          <ng-container *ngIf="!selectedOption">
            {{ placeholderKey ? (placeholderKey | t) : placeholder }}
          </ng-container>
        </span>
        <span class="gra-select-chevron" aria-hidden="true"></span>
      </button>

      <div *ngIf="open" class="gra-select-panel">
        <button
          *ngFor="let option of options"
          type="button"
          class="gra-select-option"
          [class.selected]="option.value === internalValue"
          [class.placeholder-option]="option.placeholder"
          (click)="selectOption(option)"
        >
          {{ option.labelKey ? (option.labelKey | t) : option.label }}
        </button>
      </div>
    </div>
  `,
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  @Input() options: SelectOption[] = [];
  @Input() placeholder = '';
  @Input() placeholderKey = '';
  @Input() inputId = '';
  @Input() ariaLabel = '';
  @Input() set value(value: string | null) {
    this.internalValue = value ?? '';
  }

  @Output() readonly valueChange = new EventEmitter<string>();

  open = false;
  disabled = false;
  internalValue = '';

  get selectedOption(): SelectOption | undefined {
    return this.options.find((option) => option.value === this.internalValue);
  }

  writeValue(value: string | null): void {
    this.internalValue = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle(): void {
    if (this.disabled) {
      return;
    }

    this.open = !this.open;
  }

  selectOption(option: SelectOption): void {
    this.internalValue = option.value;
    this.valueChange.emit(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.open = false;
  }

  markTouched(): void {
    this.onTouched();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.open = false;
  }
}
