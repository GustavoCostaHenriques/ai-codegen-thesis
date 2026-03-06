import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { I18nService } from '../../core/services/i18n.service';

@Pipe({
  name: 't',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private subscription: Subscription;

  constructor(
    private readonly i18n: I18nService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.subscription = this.i18n.language$.subscribe(() => this.cdr.markForCheck());
  }

  transform(key: string): string {
    return this.i18n.t(key);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
