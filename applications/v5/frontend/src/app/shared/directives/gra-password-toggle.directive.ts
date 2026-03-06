import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '.gra-password-container',
  standalone: false,
})
export class GraPasswordToggleDirective {
  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  @HostListener('click', ['$event'])
  onContainerClick(event: MouseEvent): void {
    const container = this.elementRef.nativeElement;
    if (event.target !== container) {
      return;
    }

    const passwordInput = container.querySelector<HTMLInputElement>(
      'input.gra-password'
    );
    if (!passwordInput || passwordInput.disabled) {
      return;
    }

    const canToggle =
      passwordInput.type === 'password' || passwordInput.type === 'text';
    if (!canToggle) {
      return;
    }

    const nextType = passwordInput.type === 'password' ? 'text' : 'password';
    this.renderer.setAttribute(passwordInput, 'type', nextType);

    if (nextType === 'text') {
      this.renderer.addClass(container, 'show-password');
    } else {
      this.renderer.removeClass(container, 'show-password');
    }
  }
}
