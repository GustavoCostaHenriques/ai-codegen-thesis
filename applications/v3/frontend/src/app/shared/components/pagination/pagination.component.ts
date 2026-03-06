import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageMetadata } from '../../../core/models/api.models';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input({ required: true }) pageMetadata: PageMetadata | null = null;
  @Output() pageChange = new EventEmitter<number>();

  previousPage(): void {
    if (!this.pageMetadata || this.pageMetadata.page <= 0) {
      return;
    }

    this.pageChange.emit(this.pageMetadata.page - 1);
  }

  nextPage(): void {
    if (!this.pageMetadata || this.pageMetadata.page >= this.pageMetadata.totalPages - 1) {
      return;
    }

    this.pageChange.emit(this.pageMetadata.page + 1);
  }
}
