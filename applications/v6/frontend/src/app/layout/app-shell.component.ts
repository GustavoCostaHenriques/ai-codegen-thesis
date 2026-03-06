import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthStoreService } from '../core/services/auth-store.service';
import { EventLogService } from '../core/services/event-log.service';
import { HttpErrorService } from '../core/services/http-error.service';
import { I18nService } from '../core/services/i18n.service';
import { TranslatePipe } from '../shared/pipes/t.pipe';
import { ModalComponent } from '../shared/ui/modal.component';
import { LoadingSpinnerComponent } from '../shared/ui/loading-spinner.component';
import { SelectComponent, SelectOption } from '../shared/ui/select.component';
import { AuthService } from '../features/auth/auth.service';
import { StatisticsService } from '../features/statistics/statistics.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    ModalComponent,
    LoadingSpinnerComponent,
    SelectComponent,
  ],
  template: `
    <div class="page-shell">
      <header class="gra-desktop-header header-primary backoffice notFixed">
        <div class="header-content gra-container">
          <a class="logo_a" routerLink="/weeks">
            <div class="title-block">
              <span class="eyebrow">{{ 'app.backoffice' | t }}</span>
              <h1>{{ pageTitle() | t }}</h1>
            </div>
          </a>

          <div class="menus_desktop">
            <ul class="menu header-nav" aria-label="Primary navigation">
              <li class="menu-first-level">
                <a
                  routerLink="/weeks"
                  routerLinkActive="active-link"
                  [routerLinkActiveOptions]="{ exact: false }"
                  class="gra-btn btn-secondary nav-link"
                >
                  {{ 'app.weeks' | t }}
                </a>
              </li>
              <li class="menu-first-level">
                <a routerLink="/people" routerLinkActive="active-link" class="gra-btn btn-secondary nav-link">
                  {{ 'app.people' | t }}
                </a>
              </li>
              <li class="menu-first-level">
                <a routerLink="/projects" routerLinkActive="active-link" class="gra-btn btn-secondary nav-link">
                  {{ 'app.projects' | t }}
                </a>
              </li>
              <li class="menu-first-level" *ngIf="authStore.isAdmin()">
                <button type="button" class="gra-btn btn-secondary nav-link" (click)="statisticsOpen.set(true)">
                  {{ 'app.statistics' | t }}
                </button>
              </li>
              <li class="menu-first-level">
                <button type="button" class="gra-btn btn-secondary nav-link" (click)="logout()">
                  {{ 'app.logout' | t }}
                </button>
              </li>
            </ul>

            <div class="header-utility">
              <label class="label-inline" for="shell-language">{{ 'app.language' | t }}</label>
              <app-select
                inputId="shell-language"
                class="header-language-select"
                [options]="languageOptions"
                [value]="language()"
                (valueChange)="setLanguage($any($event))"
              ></app-select>
            </div>
          </div>
        </div>
      </header>

      <header class="gra-mobile-header backoffice notFixed">
        <div class="mobile-header gra-container">
          <div class="title-block">
            <span class="eyebrow">{{ 'app.backoffice' | t }}</span>
            <h1>{{ pageTitle() | t }}</h1>
          </div>
          <div class="header-utility">
            <label class="label-inline" for="shell-language-mobile">{{ 'app.language' | t }}</label>
            <app-select
              inputId="shell-language-mobile"
              class="header-language-select"
              [options]="languageOptions"
              [value]="language()"
              (valueChange)="setLanguage($any($event))"
            ></app-select>
          </div>
        </div>
        <div class="menu_mobile display-all-menu">
          <div class="display-menu gra-container">
            <ul class="menu-mobile">
              <li><a routerLink="/weeks" routerLinkActive="active-link" class="gra-btn btn-secondary nav-link">{{ 'app.weeks' | t }}</a></li>
              <li><a routerLink="/people" routerLinkActive="active-link" class="gra-btn btn-secondary nav-link">{{ 'app.people' | t }}</a></li>
              <li><a routerLink="/projects" routerLinkActive="active-link" class="gra-btn btn-secondary nav-link">{{ 'app.projects' | t }}</a></li>
              <li *ngIf="authStore.isAdmin()"><button type="button" class="gra-btn btn-secondary nav-link" (click)="statisticsOpen.set(true)">{{ 'app.statistics' | t }}</button></li>
              <li><button type="button" class="gra-btn btn-secondary nav-link" (click)="logout()">{{ 'app.logout' | t }}</button></li>
            </ul>
          </div>
        </div>
      </header>

      <main class="gra-container gra-padding-top-l gra-padding-bottom-7xl">
        <router-outlet></router-outlet>
      </main>
    </div>

    <app-modal
      [open]="statisticsOpen()"
      [title]="'app.statistics' | t"
      [closeOnBackdrop]="!statisticsLoading()"
      (close)="closeStatisticsModal()"
    >
      <p class="gra-margin-bottom-s">{{ 'app.exportStatistics' | t }}</p>
      <div class="gra-card-text neutral">
        <div class="details">
          <div class="title">{{ 'app.personsTotal' | t }}</div>
          <div class="text">{{ 'app.assignments' | t }} / {{ 'app.planningExport' | t }}</div>
        </div>
      </div>
      <div *ngIf="statisticsError()" class="gra-feedback-msg error gra-margin-top-s">
        <span class="text">{{ statisticsError() }}</span>
      </div>
      <div *ngIf="statisticsLoading()" class="modal-spinner">
        <app-loading-spinner size="medium"></app-loading-spinner>
      </div>
      <div modal-footer class="modal-actions">
        <button type="button" class="gra-btn btn-secondary" [disabled]="statisticsLoading()" (click)="closeStatisticsModal()">
          {{ 'app.cancel' | t }}
        </button>
        <button type="button" class="gra-btn btn-primary" [disabled]="statisticsLoading()" (click)="exportStatistics()">
          {{ 'app.confirmStatistics' | t }}
        </button>
      </div>
    </app-modal>
  `,
  styleUrl: './app-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  protected readonly authStore = inject(AuthStoreService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly statisticsService = inject(StatisticsService);
  private readonly httpErrorService = inject(HttpErrorService);
  private readonly eventLogService = inject(EventLogService);
  private readonly i18nService = inject(I18nService);

  readonly pageTitle = signal('app.weeks');
  readonly language = computed(() => this.i18nService.language());
  readonly statisticsOpen = signal(false);
  readonly statisticsLoading = signal(false);
  readonly statisticsError = signal('');
  readonly languageOptions: SelectOption[] = [
    { value: 'en', label: 'EN' },
    { value: 'pt', label: 'PT' },
  ];

  constructor() {
    this.updatePageTitle();
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.updatePageTitle());
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.eventLogService.log('logout');
      this.router.navigateByUrl('/login');
    });
  }

  setLanguage(language: 'en' | 'pt'): void {
    this.i18nService.setLanguage(language);
  }

  closeStatisticsModal(): void {
    if (this.statisticsLoading()) {
      return;
    }

    this.statisticsOpen.set(false);
    this.statisticsError.set('');
  }

  exportStatistics(): void {
    this.statisticsLoading.set(true);
    this.statisticsError.set('');

    this.statisticsService
      .exportStatistics()
      .pipe(finalize(() => this.statisticsLoading.set(false)))
      .subscribe({
        next: (blob) => {
          this.downloadBlob(blob, 'weekly-planning-statistics.xlsx');
          this.eventLogService.log('statistics.export');
          this.statisticsOpen.set(false);
        },
        error: (error) => {
          this.statisticsError.set(this.httpErrorService.parse(error).message);
        },
      });
  }

  private updatePageTitle(): void {
    let current = this.router.routerState.snapshot.root;

    while (current.firstChild) {
      current = current.firstChild;
    }

    this.pageTitle.set((current.data['title'] as string | undefined) ?? 'app.weeks');
  }

  private downloadBlob(blob: Blob, fileName: string): void {
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(objectUrl);
  }
}
