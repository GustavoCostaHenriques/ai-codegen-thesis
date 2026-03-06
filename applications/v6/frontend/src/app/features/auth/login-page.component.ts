import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpErrorService } from '../../core/services/http-error.service';
import { AuthStoreService } from '../../core/services/auth-store.service';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/t.pipe';
import { ModalComponent } from '../../shared/ui/modal.component';
import { LoadingSpinnerComponent } from '../../shared/ui/loading-spinner.component';
import { SelectComponent, SelectOption } from '../../shared/ui/select.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    ModalComponent,
    LoadingSpinnerComponent,
    SelectComponent,
  ],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-card-header">
          <h1>{{ 'app.login' | t }}</h1>
          <div class="language-control">
            <label for="login-language">{{ 'app.language' | t }}</label>
            <app-select
              inputId="login-language"
              [options]="languageOptions"
              [value]="language()"
              (valueChange)="setLanguage($any($event))"
            ></app-select>
          </div>
        </div>

        <form [formGroup]="loginForm" class="auth-form" (ngSubmit)="submitLogin()">
          <div class="field-group">
            <label for="username" class="required-label">{{ 'app.username' | t }}</label>
            <input
              id="username"
              class="form form-control required-field"
              [class.form-error]="hasControlError(loginForm, 'username') || !!getAuthFieldError('username')"
              formControlName="username"
              autocomplete="username"
            />
            <div class="graRequiredField" *ngIf="hasControlError(loginForm, 'username') || getAuthFieldError('username')">
              {{ getAuthFieldError('username') || ('app.required' | t) }}
            </div>
          </div>

          <div class="field-group">
            <label for="password" class="required-label">{{ 'app.password' | t }}</label>
            <div class="gra-password-container">
              <input
                id="password"
                type="password"
                class="form form-control gra-password required-field"
                [class.form-error]="hasControlError(loginForm, 'password') || !!getAuthFieldError('password')"
                formControlName="password"
                autocomplete="current-password"
              />
            </div>
            <div class="graRequiredField" *ngIf="hasControlError(loginForm, 'password') || getAuthFieldError('password')">
              {{ getAuthFieldError('password') || ('app.required' | t) }}
            </div>
            <button type="button" class="gra-link change-password-link" (click)="openPasswordModal()">
              {{ 'app.changePassword' | t }}
            </button>
          </div>

          <div *ngIf="loginError()" class="gra-feedback-msg error">
            <span class="text">{{ loginError() }}</span>
          </div>

          <button type="submit" class="gra-btn btn-primary auth-submit" [disabled]="loginLoading()">
            <ng-container *ngIf="!loginLoading(); else loadingLabel">{{ 'app.login' | t }}</ng-container>
          </button>
          <ng-template #loadingLabel>
            <div class="button-loading">
              <app-loading-spinner size="small"></app-loading-spinner>
            </div>
          </ng-template>
        </form>
      </div>
    </div>

    <app-modal
      [open]="passwordModalOpen()"
      [title]="'app.changePassword' | t"
      [closeOnBackdrop]="!passwordLoading()"
      (close)="closePasswordModal()"
    >
      <p *ngIf="!authStore.isAuthenticated()" class="gra-feedback-msg info">
        <span class="text">{{ 'app.passwordChangeRequiresAuth' | t }}</span>
      </p>

        <form [formGroup]="passwordForm" class="modal-form" (ngSubmit)="submitPasswordChange()">
          <div class="modal-grid">
            <div class="field-group">
              <label for="change-username" class="required-label">{{ 'app.username' | t }}</label>
              <input
                id="change-username"
                class="form form-control required-field"
                formControlName="username"
                [class.form-error]="hasControlError(passwordForm, 'username') || !!getPasswordFieldError('username')"
              />
            <div class="graRequiredField" *ngIf="hasControlError(passwordForm, 'username') || getPasswordFieldError('username')">
              {{ getPasswordFieldError('username') || ('app.required' | t) }}
            </div>
          </div>

          <div class="field-group">
            <label for="change-current" class="required-label">{{ 'app.currentPassword' | t }}</label>
            <div class="gra-password-container">
              <input
                id="change-current"
                type="password"
                class="form form-control required-field"
                formControlName="currentPassword"
                [class.form-error]="hasControlError(passwordForm, 'currentPassword') || !!getPasswordFieldError('currentPassword')"
              />
            </div>
            <div class="graRequiredField" *ngIf="hasControlError(passwordForm, 'currentPassword') || getPasswordFieldError('currentPassword')">
              {{ getPasswordFieldError('currentPassword') || ('app.required' | t) }}
            </div>
          </div>

          <div class="field-group">
            <label for="change-new" class="required-label">{{ 'app.newPassword' | t }}</label>
            <div class="gra-password-container">
              <input
                id="change-new"
                type="password"
                class="form form-control required-field"
                formControlName="newPassword"
                [class.form-error]="hasControlError(passwordForm, 'newPassword') || !!getPasswordFieldError('newPassword')"
              />
            </div>
            <div class="graRequiredField" *ngIf="hasControlError(passwordForm, 'newPassword') || getPasswordFieldError('newPassword')">
              {{ getPasswordFieldError('newPassword') || ('app.required' | t) }}
            </div>
          </div>

          <div class="field-group">
            <label for="change-confirm" class="required-label">{{ 'app.confirmPassword' | t }}</label>
            <div class="gra-password-container">
              <input
                id="change-confirm"
                type="password"
                class="form form-control required-field"
                formControlName="confirmNewPassword"
                [class.form-error]="hasControlError(passwordForm, 'confirmNewPassword') || passwordForm.hasError('mismatch')"
              />
            </div>
            <div class="graRequiredField" *ngIf="hasControlError(passwordForm, 'confirmNewPassword') || passwordForm.hasError('mismatch')">
              {{ passwordForm.hasError('mismatch') ? ('app.passwordMismatch' | t) : ('app.required' | t) }}
            </div>
          </div>
        </div>

        <div *ngIf="passwordError()" class="gra-feedback-msg error">
          <span class="text">{{ passwordError() }}</span>
        </div>
      </form>

      <div modal-footer class="modal-actions">
        <button type="button" class="gra-btn btn-secondary" [disabled]="passwordLoading()" (click)="closePasswordModal()">
          {{ 'app.cancel' | t }}
        </button>
        <button type="button" class="gra-btn btn-primary" [disabled]="passwordLoading()" (click)="submitPasswordChange()">
          {{ 'app.confirm' | t }}
        </button>
      </div>
    </app-modal>
  `,
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly httpErrorService = inject(HttpErrorService);
  protected readonly authStore = inject(AuthStoreService);
  private readonly i18nService = inject(I18nService);

  readonly language = this.i18nService.language;
  readonly loginLoading = signal(false);
  readonly loginError = signal('');
  readonly authFieldErrors = signal<Record<string, string>>({});
  readonly passwordModalOpen = signal(false);
  readonly passwordLoading = signal(false);
  readonly passwordError = signal('');
  readonly passwordFieldErrors = signal<Record<string, string>>({});
  readonly languageOptions: SelectOption[] = [
    { value: 'pt', label: 'PT' },
    { value: 'en', label: 'EN' },
  ];

  readonly loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.maxLength(80)]],
    password: ['', [Validators.required, Validators.maxLength(200)]],
  });

  readonly passwordForm = this.formBuilder.group(
    {
      username: ['', [Validators.required, Validators.maxLength(80)]],
      currentPassword: ['', [Validators.required, Validators.maxLength(200)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(200)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(200)]],
    },
    {
      validators: (form) =>
        form.get('newPassword')?.value === form.get('confirmNewPassword')?.value ? null : { mismatch: true },
    },
  );

  submitLogin(): void {
    this.loginError.set('');
    this.authFieldErrors.set({});

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginLoading.set(true);

    this.authService
      .login({
        username: this.loginForm.get('username')?.value ?? '',
        password: this.loginForm.get('password')?.value ?? '',
      })
      .pipe(finalize(() => this.loginLoading.set(false)))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/weeks');
        },
        error: (error) => {
          const parsed = this.httpErrorService.parse(error);
          this.loginError.set(parsed.message);
          this.authFieldErrors.set({
            username: parsed.message,
            password: parsed.message,
            ...parsed.fieldErrors,
          });
        },
      });
  }

  openPasswordModal(): void {
    this.passwordModalOpen.set(true);
    this.passwordError.set('');
    this.passwordFieldErrors.set({});
    this.passwordForm.patchValue({
      username: this.loginForm.get('username')?.value ?? this.authStore.user()?.username ?? '',
    });
  }

  closePasswordModal(): void {
    if (this.passwordLoading()) {
      return;
    }

    this.passwordModalOpen.set(false);
    this.passwordError.set('');
    this.passwordFieldErrors.set({});
    this.passwordForm.reset({
      username: this.authStore.user()?.username ?? this.loginForm.get('username')?.value ?? '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  }

  submitPasswordChange(): void {
    this.passwordError.set('');
    this.passwordFieldErrors.set({});

    if (!this.authStore.isAuthenticated()) {
      this.passwordError.set(this.i18nService.translate('app.passwordChangeRequiresAuth'));
      return;
    }

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.passwordLoading.set(true);

    this.authService
      .changePassword({
        username: this.passwordForm.get('username')?.value ?? '',
        currentPassword: this.passwordForm.get('currentPassword')?.value ?? '',
        newPassword: this.passwordForm.get('newPassword')?.value ?? '',
        confirmNewPassword: this.passwordForm.get('confirmNewPassword')?.value ?? '',
      })
      .pipe(finalize(() => this.passwordLoading.set(false)))
      .subscribe({
        next: () => {
          this.closePasswordModal();
        },
        error: (error) => {
          const parsed = this.httpErrorService.parse(error);
          this.passwordError.set(parsed.message);
          this.passwordFieldErrors.set(parsed.fieldErrors);
        },
      });
  }

  hasControlError(form: UntypedFormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return Boolean(control && control.invalid && (control.touched || control.dirty));
  }

  getAuthFieldError(fieldName: string): string {
    return this.authFieldErrors()[fieldName] ?? '';
  }

  getPasswordFieldError(fieldName: string): string {
    return this.passwordFieldErrors()[fieldName] ?? '';
  }

  setLanguage(language: 'en' | 'pt'): void {
    this.i18nService.setLanguage(language);
  }
}
