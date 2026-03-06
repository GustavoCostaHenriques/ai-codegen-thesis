import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, finalize, Subject, takeUntil } from 'rxjs';
import { AuthApiService } from '../../core/services/api/auth-api.service';
import { ProfileApiService } from '../../core/services/api/profile-api.service';
import { StatisticsApiService } from '../../core/services/api/statistics-api.service';
import { ApiErrorService } from '../../core/services/api-error.service';
import { AuthStateService } from '../../core/services/auth-state.service';
import { EventLogService } from '../../core/services/event-log.service';
import { LanguageCode, I18nService } from '../../shared/services/i18n.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
  standalone: false,
})
export class ShellComponent implements OnInit, OnDestroy {
  titleKey = 'app.weeks';
  currentRoute = '';
  globalError = '';
  statisticsModalOpen = false;
  statsLoading = false;
  logoutLoading = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authStateService: AuthStateService,
    private readonly authApiService: AuthApiService,
    private readonly profileApiService: ProfileApiService,
    private readonly statisticsApiService: StatisticsApiService,
    private readonly apiErrorService: ApiErrorService,
    private readonly i18nService: I18nService,
    private readonly eventLogService: EventLogService
  ) {}

  ngOnInit(): void {
    document.body.classList.remove('templateIniciarSessao');
    document.body.classList.add('templateDetailsBackoffice');

    this.currentRoute = this.router.url;
    this.resolveTitleFromRoute();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.currentRoute = this.router.url;
        this.resolveTitleFromRoute();
        this.globalError = '';
      });

    if (this.authStateService.isAuthenticated() && !this.authStateService.getCurrentUser()) {
      this.profileApiService
        .getCurrentUser()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (user) => this.authStateService.setCurrentUser(user),
          error: () => this.authStateService.clearSession(),
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isAdmin(): boolean {
    return this.authStateService.isAdmin();
  }

  get currentLanguage(): LanguageCode {
    return this.i18nService.language;
  }

  get isPlanningRoute(): boolean {
    return this.currentRoute.includes('/planning');
  }

  onLanguageChange(language: LanguageCode): void {
    this.i18nService.setLanguage(language);
    this.eventLogService.log('language.changed', { language });
  }

  onLogout(): void {
    this.logoutLoading = true;
    this.authApiService
      .deleteCurrentSession()
      .pipe(
        finalize(() => {
          this.logoutLoading = false;
          this.authStateService.clearSession();
          this.router.navigate(['/login']);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => this.eventLogService.log('auth.logout.success'),
        error: () => this.eventLogService.log('auth.logout.error'),
      });
  }

  openStatisticsModal(): void {
    if (!this.isAdmin) {
      return;
    }
    this.statisticsModalOpen = true;
  }

  closeStatisticsModal(): void {
    this.statisticsModalOpen = false;
  }

  exportStatistics(): void {
    this.statsLoading = true;
    this.globalError = '';

    this.statisticsApiService
      .createStatisticsExport()
      .pipe(
        finalize(() => {
          this.statsLoading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = `statistics-${new Date().toISOString()}.xlsx`;
          anchor.click();
          window.URL.revokeObjectURL(url);
          this.statisticsModalOpen = false;
          this.eventLogService.log('statistics.export.success');
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.globalError = parsedError.message;
          this.eventLogService.log('statistics.export.error', parsedError);
        },
      });
  }

  private resolveTitleFromRoute(): void {
    let active = this.route.firstChild;
    while (active?.firstChild) {
      active = active.firstChild;
    }
    this.titleKey = active?.snapshot.data['titleKey'] ?? 'app.weeks';
  }
}
