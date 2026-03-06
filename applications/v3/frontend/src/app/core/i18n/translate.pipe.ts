import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from './i18n.service';

@Pipe({
  name: 't',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private readonly i18nService: I18nService) {}

  transform(key: string, params?: Record<string, string | number>): string {
    this.i18nService.language();
    return this.i18nService.translate(key, params);
  }
}
