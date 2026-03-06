import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageMetadata } from '../../core/models/api.models';
import { TranslatePipe } from '../pipes/t.pipe';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div *ngIf="page()" class="gra-pagination" data-is-external-content="false" data-items-per-page="4" data-element-id="table">
      <div class="results">
        {{ fromIndex() }} {{ 'app.of' | t }} {{ toIndex() }} {{ 'app.of' | t }} {{ page()!.totalElements }} {{ 'app.results' | t }}
      </div>
      <div class="resultsMobile">
        {{ page()!.page + 1 }} / {{ page()!.totalPages || 1 }}
      </div>
      <div class="navigation">
        <button type="button" class="icon icon-secondary prev" [disabled]="!hasPrevious()" (click)="goTo(page()!.page - 1)">
          {{ 'app.previous' | t }}
        </button>
        <div class="page-numbers">
          <button
            *ngFor="let currentPage of pages()"
            type="button"
            class="page-number"
            [class.active]="currentPage === page()!.page"
            (click)="goTo(currentPage)"
          >
            {{ currentPage + 1 }}
          </button>
        </div>
        <button type="button" class="icon icon-secondary next" [disabled]="!hasNext()" (click)="goTo(page()!.page + 1)">
          {{ 'app.next' | t }}
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  readonly page = input<PageMetadata | null>(null);
  @Output() readonly pageChange = new EventEmitter<number>();

  readonly fromIndex = computed(() => {
    const page = this.page();
    if (!page || page.totalElements === 0) {
      return 0;
    }
    return page.page * page.size + 1;
  });

  readonly toIndex = computed(() => {
    const page = this.page();
    if (!page) {
      return 0;
    }
    return Math.min((page.page + 1) * page.size, page.totalElements);
  });

  readonly hasNext = computed(() => Boolean(this.page()?.hasNext ?? false));
  readonly hasPrevious = computed(() => Boolean(this.page()?.hasPrevious ?? false));
  readonly pages = computed(() => {
    const page = this.page();
    if (!page || page.totalPages <= 0) {
      return [];
    }

    return Array.from({ length: page.totalPages }, (_, index) => index);
  });

  goTo(pageIndex: number): void {
    const page = this.page();
    if (!page || pageIndex < 0 || pageIndex >= page.totalPages || pageIndex === page.page) {
      return;
    }

    this.pageChange.emit(pageIndex);
  }
}
