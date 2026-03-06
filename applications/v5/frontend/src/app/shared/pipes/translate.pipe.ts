import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { I18nService } from '../services/i18n.service';

@Pipe({
  name: 't',
  standalone: false,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly subscription: Subscription;

  constructor(
    private readonly i18nService: I18nService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.subscription = this.i18nService.language$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  transform(
    key: string,
    values?: Record<string, string | number> | null
  ): string {
    if (!values) {
      return this.i18nService.translate(key);
    }
    return this.i18nService.interpolate(key, values);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
