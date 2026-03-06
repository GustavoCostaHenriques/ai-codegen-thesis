import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

type NavItem = { labelKey: string; route: string };

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent {
  @Input() titleKey = '';

  readonly navItems: NavItem[] = [
    { labelKey: 'nav.weeks', route: '/weeks' },
    { labelKey: 'nav.persons', route: '/persons' },
    { labelKey: 'nav.projects', route: '/projects' },
  ];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  isActive(route: string): boolean {
    if (route === '/weeks') {
      return this.router.url.startsWith('/weeks');
    }

    return this.router.url.startsWith(route);
  }

  goTo(route: string): void {
    void this.router.navigateByUrl(route);
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
