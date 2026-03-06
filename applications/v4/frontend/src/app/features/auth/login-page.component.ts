import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AccountsApiService } from '../../core/services/api/accounts-api.service';
import { AuthService } from '../../core/services/auth.service';
import { ErrorMapperService, UiError } from '../../core/services/error-mapper.service';
import { I18nService, Language } from '../../core/services/i18n.service';
import { ModalShellComponent } from '../../shared/components/modal-shell/modal-shell.component';
import {
  OptionDialogComponent,
  OptionItem
} from '../../shared/components/option-dialog/option-dialog.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalShellComponent,
    OptionDialogComponent,
    TranslatePipe
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  readonly languageOptions: OptionItem<Language>[] = [
    { label: 'PT-PT', value: 'PT-PT' },
    { label: 'EN', value: 'EN' }
  ];

  readonly loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.maxLength(128)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]]
  });

  readonly createAccountForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.maxLength(128)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]]
  });

  readonly changePasswordForm = this.fb.nonNullable.group(
    {
      username: ['', [Validators.required, Validators.maxLength(128)]],
      currentPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]]
    },
    {
      validators: [mustMatch('newPassword', 'confirmNewPassword')]
    }
  );

  showCreateAccountModal = false;
  showChangePasswordModal = false;
  showLanguageDialog = false;

  isLoggingIn = false;
  isCreatingAccount = false;
  isChangingPassword = false;

  loginError: UiError | null = null;
  createAccountError: UiError | null = null;
  changePasswordError: UiError | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly accountsApi: AccountsApiService,
    private readonly errorMapper: ErrorMapperService,
    private readonly i18n: I18nService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  get currentLanguage(): Language {
    return this.i18n.currentLanguage;
  }

  setLanguage(language: Language): void {
    this.i18n.setLanguage(language);
    this.showLanguageDialog = false;
  }

  submitLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginError = null;
    this.isLoggingIn = true;

    this.authService
      .login({
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value
      })
      .pipe(finalize(() => (this.isLoggingIn = false)))
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/weeks';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.loginError = this.errorMapper.map(error);
        }
      });
  }

  openCreateAccount(): void {
    this.createAccountForm.reset({ username: '', email: '', password: '' });
    this.createAccountError = null;
    this.showCreateAccountModal = true;
  }

  submitCreateAccount(): void {
    if (this.createAccountForm.invalid) {
      this.createAccountForm.markAllAsTouched();
      return;
    }

    const username = this.createAccountForm.controls.username.value.trim();

    this.createAccountError = null;
    this.isCreatingAccount = true;

    this.accountsApi
      .registerAccount({
        name: username,
        username,
        email: this.createAccountForm.controls.email.value,
        password: this.createAccountForm.controls.password.value
      })
      .pipe(finalize(() => (this.isCreatingAccount = false)))
      .subscribe({
        next: () => {
          this.showCreateAccountModal = false;
          this.loginForm.patchValue({ username });
        },
        error: (error) => {
          this.createAccountError = this.errorMapper.map(error);
        }
      });
  }

  openChangePassword(): void {
    this.changePasswordForm.reset({
      username: this.loginForm.controls.username.value,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
    this.changePasswordError = null;
    this.showChangePasswordModal = true;
  }

  submitChangePassword(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.changePasswordError = null;
    this.isChangingPassword = true;

    this.accountsApi
      .changePassword({
        username: this.changePasswordForm.controls.username.value,
        currentPassword: this.changePasswordForm.controls.currentPassword.value,
        newPassword: this.changePasswordForm.controls.newPassword.value,
        confirmNewPassword: this.changePasswordForm.controls.confirmNewPassword.value
      })
      .pipe(finalize(() => (this.isChangingPassword = false)))
      .subscribe({
        next: () => {
          this.showChangePasswordModal = false;
        },
        error: (error) => {
          this.changePasswordError = this.errorMapper.map(error);
        }
      });
  }

  controlError(form: FormGroup, controlName: string, apiError: UiError | null): string {
    const control = form.get(controlName);
    if (!control || (!control.touched && !control.dirty)) {
      return '';
    }

    if (control.errors?.['required']) {
      return 'Required field';
    }
    if (control.errors?.['email']) {
      return 'Invalid email';
    }
    if (control.errors?.['minlength']) {
      return `Minimum length ${control.errors['minlength'].requiredLength}`;
    }
    if (control.errors?.['maxlength']) {
      return `Maximum length ${control.errors['maxlength'].requiredLength}`;
    }

    return apiError?.fieldErrors[controlName] ?? '';
  }

  formError(error: UiError | null): string {
    return error?.message ?? '';
  }

  closeCreateModal(): void {
    this.showCreateAccountModal = false;
  }

  closeChangePasswordModal(): void {
    this.showChangePasswordModal = false;
  }
}

function mustMatch(firstField: string, secondField: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const first = control.get(firstField)?.value;
    const second = control.get(secondField)?.value;
    const secondControl = control.get(secondField);

    if (!first || !second) {
      if (secondControl?.errors?.['mustMatch']) {
        const { mustMatch: _, ...rest } = secondControl.errors;
        secondControl.setErrors(Object.keys(rest).length ? rest : null);
      }
      return null;
    }

    if (first !== second) {
      const currentErrors = secondControl?.errors ?? {};
      secondControl?.setErrors({ ...currentErrors, mustMatch: true });
      return { mustMatch: true };
    }

    if (secondControl?.errors?.['mustMatch']) {
      const { mustMatch: _, ...rest } = secondControl.errors;
      secondControl.setErrors(Object.keys(rest).length ? rest : null);
    }

    return null;
  };
}
