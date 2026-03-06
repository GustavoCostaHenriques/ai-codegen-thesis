import { ChangeDetectorRef, inject, Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';

@Pipe({
  name: 't',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly i18nService = inject(I18nService);
  private readonly cdr = inject(ChangeDetectorRef);

  transform(value: string): string {
    this.cdr.markForCheck();
    return this.i18nService.translate(value);
  }
}
