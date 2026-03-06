import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AuthApiService } from '../../../../core/services/api/auth-api.service';
import { ProfileApiService } from '../../../../core/services/api/profile-api.service';
import { ApiErrorService } from '../../../../core/services/api-error.service';
import { AuthStateService } from '../../../../core/services/auth-state.service';
import { EventLogService } from '../../../../core/services/event-log.service';
import { PasswordChangeRequest } from '../../../../shared/models/api.models';
import { I18nService, LanguageCode } from '../../../../shared/services/i18n.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  standalone: false,
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginLoading = false;
  changePasswordLoading = false;
  loginError = '';
  passwordChangeError = '';
  passwordChangeSuccess = '';
  passwordModalOpen = false;
  submitted = false;
  passwordSubmitted = false;

  private readonly destroy$ = new Subject<void>();
  private readonly formBuilder = inject(FormBuilder);

  readonly loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.maxLength(80)]],
    password: ['', [Validators.required, Validators.maxLength(200)]],
  });

  readonly passwordForm = this.formBuilder.group(
    {
      username: ['', [Validators.required, Validators.maxLength(80)]],
      currentPassword: ['', [Validators.required, Validators.maxLength(200)]],
      newPassword: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(200)],
      ],
      confirmNewPassword: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(200)],
      ],
    },
    {
      validators: (group) => {
        const newPassword = group.get('newPassword')?.value;
        const confirmNewPassword = group.get('confirmNewPassword')?.value;
        if (!newPassword || !confirmNewPassword) {
          return null;
        }
        return newPassword === confirmNewPassword
          ? null
          : { passwordMismatch: true };
      },
    }
  );

  constructor(
    private readonly router: Router,
    private readonly authApiService: AuthApiService,
    private readonly profileApiService: ProfileApiService,
    private readonly authStateService: AuthStateService,
    private readonly apiErrorService: ApiErrorService,
    private readonly i18nService: I18nService,
    private readonly eventLogService: EventLogService
  ) {}

  ngOnInit(): void {
    document.body.classList.remove('templateDetailsBackoffice');
    document.body.classList.add('templateIniciarSessao');

    if (this.authStateService.isAuthenticated()) {
      this.router.navigate(['/weeks']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get currentLanguage(): LanguageCode {
    return this.i18nService.language;
  }

  setLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const language = target.value as LanguageCode;
    this.i18nService.setLanguage(language);
  }

  openChangePasswordModal(): void {
    this.passwordModalOpen = true;
    this.passwordSubmitted = false;
    this.passwordChangeError = '';
    this.passwordChangeSuccess = '';
    this.passwordForm.reset({
      username: this.loginForm.controls.username.value ?? '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  }

  closeChangePasswordModal(): void {
    this.passwordModalOpen = false;
  }

  login(): void {
    this.submitted = true;
    this.loginError = '';
    if (this.loginForm.invalid) {
      return;
    }

    const payload = {
      username: this.loginForm.controls.username.value ?? '',
      password: this.loginForm.controls.password.value ?? '',
    };

    this.loginLoading = true;
    this.authApiService
      .createSession(payload)
      .pipe(
        finalize(() => {
          this.loginLoading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (session) => {
          this.authStateService.setSession(session);
          this.profileApiService
            .getCurrentUser()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (user) => {
                this.authStateService.setCurrentUser(user);
                this.router.navigate(['/weeks']);
              },
              error: () => {
                this.router.navigate(['/weeks']);
              },
            });
          this.eventLogService.log('auth.login.success', {
            username: payload.username,
          });
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.loginError = parsedError.message;
          this.eventLogService.log('auth.login.error', parsedError);
        },
      });
  }

  changePassword(): void {
    this.passwordSubmitted = true;
    this.passwordChangeError = '';
    this.passwordChangeSuccess = '';

    if (this.passwordForm.invalid) {
      return;
    }

    const payload: PasswordChangeRequest = {
      username: this.passwordForm.controls.username.value ?? '',
      currentPassword: this.passwordForm.controls.currentPassword.value ?? '',
      newPassword: this.passwordForm.controls.newPassword.value ?? '',
      confirmNewPassword:
        this.passwordForm.controls.confirmNewPassword.value ?? '',
    };

    this.changePasswordLoading = true;
    this.authApiService
      .createPasswordChange(payload)
      .pipe(
        finalize(() => {
          this.changePasswordLoading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.passwordChangeSuccess = this.i18nService.translate(
            'auth.passwordChanged'
          );
          this.eventLogService.log('auth.password.change.success', {
            username: payload.username,
          });
        },
        error: (error: unknown) => {
          const parsedError = this.apiErrorService.parse(error);
          this.passwordChangeError = parsedError.message;
          this.eventLogService.log('auth.password.change.error', parsedError);
        },
      });
  }
}
