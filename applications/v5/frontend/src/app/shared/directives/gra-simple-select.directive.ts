import {
  AfterViewInit,
  Directive,
  DoCheck,
  ElementRef,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: 'select.gra-select.gra-simple-select',
  standalone: false,
})
export class GraSimpleSelectDirective
  implements AfterViewInit, DoCheck, OnDestroy
{
  private initialized = false;
  private lastValue = '';
  private mutationObserver: MutationObserver | null = null;

  constructor(private readonly elementRef: ElementRef<HTMLSelectElement>) {}

  ngAfterViewInit(): void {
    this.lastValue = this.elementRef.nativeElement.value;
    queueMicrotask(() => {
      this.initialize();
      this.observeMutations();
    });
  }

  ngDoCheck(): void {
    const currentValue = this.elementRef.nativeElement.value;
    if (currentValue === this.lastValue) {
      return;
    }

    this.lastValue = currentValue;
    this.refreshView();
  }

  ngOnDestroy(): void {
    this.mutationObserver?.disconnect();
    this.mutationObserver = null;
    this.destroy();
  }

  private initialize(): void {
    const jq = this.getJQuery();
    if (!jq || typeof jq.fn?.select2 === 'undefined') {
      return;
    }

    const nativeSelect = this.elementRef.nativeElement;
    const $select = jq(nativeSelect);

    if ($select.data('select2')) {
      this.initialized = true;
      this.refreshView();
      return;
    }

    const hasSearch = nativeSelect.classList.contains('with-search');
    const emptyOption = Array.from(nativeSelect.options).find(
      (option) => option.value === ''
    );
    const placeholder = emptyOption?.text || 'Selecione';

    const config: Record<string, unknown> = {
      placeholder,
      width: '100%',
      allowClear: false,
    };

    if (!hasSearch) {
      config['minimumResultsForSearch'] = Infinity;
    }

    $select.select2(config);
    $select.on('select2:open.gra', () => {
      const searchInput = jq('.select2-search__field');
      if (searchInput.length) {
        searchInput.attr('placeholder', 'Pesquisar');
      }
    });

    this.initialized = true;
    this.refreshView();
  }

  private observeMutations(): void {
    if (this.mutationObserver) {
      return;
    }

    this.mutationObserver = new MutationObserver(() => {
      if (!this.initialized) {
        this.initialize();
        return;
      }
      this.refreshView();
    });

    this.mutationObserver.observe(this.elementRef.nativeElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled'],
    });
  }

  private refreshView(): void {
    if (!this.initialized) {
      return;
    }

    const jq = this.getJQuery();
    if (!jq) {
      return;
    }

    jq(this.elementRef.nativeElement).trigger('change.select2');
  }

  private destroy(): void {
    const jq = this.getJQuery();
    if (!jq) {
      return;
    }

    const $select = jq(this.elementRef.nativeElement);
    $select.off('.gra');

    if ($select.data('select2')) {
      $select.select2('destroy');
    }

    this.initialized = false;
  }

  private getJQuery(): any | null {
    const globalWindow = window as unknown as {
      jQuery?: unknown;
      $?: unknown;
    };
    const jq = globalWindow.jQuery ?? globalWindow.$;
    if (!jq) {
      return null;
    }
    return jq;
  }
}
