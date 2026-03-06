import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { AuthService } from '../../development/services/auth.service';
import { I18nService } from '../services/i18n.service';

@Component({
  selector: 'app-app-shell',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.css',
})
export class AppShellComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly i18nService = inject(I18nService);
  private readonly destroyRef = inject(DestroyRef);

  readonly pageTitle = signal('Weekly Planning');

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        startWith(null),
        map(() => this.resolveCurrentTitle()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(title => this.pageTitle.set(title));
  }

  navigateTo(path: '/weeks' | '/people' | '/projects'): void {
    this.router.navigateByUrl(path);
  }

  isRouteActive(pathPrefix: '/weeks' | '/people' | '/projects'): boolean {
    return this.router.url.startsWith(pathPrefix);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  label(key: string): string {
    return this.i18nService.translate(key);
  }

  private resolveCurrentTitle(): string {
    let currentRoute: ActivatedRoute | null = this.activatedRoute.firstChild;

    while (currentRoute?.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const routeTitle = currentRoute?.snapshot?.data?.['title'];
    return typeof routeTitle === 'string' ? routeTitle : 'Weekly Planning';
  }
}
