import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AppLanguage, I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { ErrorMapperService } from '../../../core/services/error-mapper.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmNewPassword = control.get('confirmNewPassword')?.value;

    if (!newPassword || !confirmNewPassword) {
      return null;
    }

    return newPassword === confirmNewPassword ? null : { passwordMismatch: true };
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe, ModalComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly loginForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  readonly registerForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  readonly changePasswordForm = this.formBuilder.nonNullable.group(
    {
      username: ['', [Validators.required]],
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: [passwordMatchValidator()] },
  );

  readonly languageOptions: AppLanguage[] = ['pt-PT', 'en'];

  showCreateAccountModal = false;
  showChangePasswordModal = false;

  isLoggingIn = false;
  isRegistering = false;
  isChangingPassword = false;

  loginError = '';
  registerError = '';
  changePasswordError = '';
  successMessage = '';

  loginFieldErrors: Record<string, string> = {};
  registerFieldErrors: Record<string, string> = {};
  changePasswordFieldErrors: Record<string, string> = {};

  constructor(
    private readonly authService: AuthService,
    private readonly errorMapper: ErrorMapperService,
    private readonly i18nService: I18nService,
    private readonly router: Router,
  ) {}

  get selectedLanguage(): AppLanguage {
    return this.i18nService.language();
  }

  setLanguage(language: string): void {
    if (language === 'pt-PT' || language === 'en') {
      this.i18nService.setLanguage(language);
    }
  }

  submitLogin(): void {
    this.successMessage = '';
    this.loginError = '';
    this.loginFieldErrors = {};

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoggingIn = true;
    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(finalize(() => (this.isLoggingIn = false)))
      .subscribe({
        next: () => {
          void this.router.navigate(['/weeks']);
        },
        error: (error: unknown) => {
          this.loginError = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('auth.loginFailed'),
          );
          this.loginFieldErrors = this.errorMapper.getFieldErrors(error);
        },
      });
  }

  submitCreateAccount(): void {
    this.registerError = '';
    this.registerFieldErrors = {};

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const value = this.registerForm.getRawValue();

    this.isRegistering = true;
    this.authService
      .registerAccount({
        name: value.username,
        username: value.username,
        email: value.email,
        password: value.password,
      })
      .pipe(finalize(() => (this.isRegistering = false)))
      .subscribe({
        next: () => {
          this.showCreateAccountModal = false;
          this.registerForm.reset();
          this.successMessage = this.i18nService.translate('auth.accountCreated');
        },
        error: (error: unknown) => {
          this.registerError = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('auth.registerFailed'),
          );
          this.registerFieldErrors = this.errorMapper.getFieldErrors(error);
        },
      });
  }

  submitChangePassword(): void {
    this.changePasswordError = '';
    this.changePasswordFieldErrors = {};

    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      if (this.changePasswordForm.hasError('passwordMismatch')) {
        this.changePasswordError = this.i18nService.translate('auth.passwordMismatch');
      }
      return;
    }

    this.isChangingPassword = true;
    this.authService
      .changePassword(this.changePasswordForm.getRawValue())
      .pipe(finalize(() => (this.isChangingPassword = false)))
      .subscribe({
        next: () => {
          this.showChangePasswordModal = false;
          this.changePasswordForm.reset();
          this.successMessage = this.i18nService.translate('auth.passwordChanged');
        },
        error: (error: unknown) => {
          this.changePasswordError = this.errorMapper.getMessage(
            error,
            this.i18nService.translate('auth.changePasswordFailed'),
          );
          this.changePasswordFieldErrors = this.errorMapper.getFieldErrors(error);
        },
      });
  }

  hasControlError(formName: 'login' | 'register' | 'change', controlName: string): boolean {
    const control = this.getControl(formName, controlName);
    return Boolean(control && control.invalid && (control.dirty || control.touched));
  }

  getFieldError(formName: 'login' | 'register' | 'change', controlName: string): string {
    const control = this.getControl(formName, controlName);

    if (control?.hasError('required')) {
      return this.i18nService.translate('common.required');
    }

    if (control?.hasError('email')) {
      return this.i18nService.translate('common.invalidEmail');
    }

    if (control?.hasError('minlength')) {
      return this.i18nService.translate('common.minLength');
    }

    const backendErrors = this.getBackendErrors(formName);
    return backendErrors[controlName] ?? '';
  }

  private getControl(formName: 'login' | 'register' | 'change', controlName: string): AbstractControl | null {
    if (formName === 'login') {
      return this.loginForm.get(controlName);
    }

    if (formName === 'register') {
      return this.registerForm.get(controlName);
    }

    return this.changePasswordForm.get(controlName);
  }

  private getBackendErrors(formName: 'login' | 'register' | 'change'): Record<string, string> {
    if (formName === 'login') {
      return this.loginFieldErrors;
    }

    if (formName === 'register') {
      return this.registerFieldErrors;
    }

    return this.changePasswordFieldErrors;
  }
}
