import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LanguageCode, I18nService } from '../../../core/services/i18n.service';
import { AccountRole } from '../../models/account';
import { AuthService } from '../../services/auth.service';
import { ModalShellComponent } from '../../../shared/modal-shell/modal-shell.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ModalShellComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly i18nService = inject(I18nService);

  readonly loginForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  readonly createAccountForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['VIEWER' as AccountRole, [Validators.required]],
  });

  loginSubmitted = false;
  createAccountSubmitted = false;
  isCreateAccountModalOpen = false;
  isSubmittingLogin = false;
  isSubmittingCreateAccount = false;
  loginErrorMessage = '';
  createAccountErrorMessage = '';
  createAccountSuccessMessage = '';

  constructor() {
    if (this.authService.isAuthenticated()) {
      void this.router.navigateByUrl('/weeks');
    }
  }

  label(key: string): string {
    return this.i18nService.translate(key);
  }

  isLanguageActive(language: LanguageCode): boolean {
    return this.i18nService.language() === language;
  }

  setLanguage(language: LanguageCode): void {
    this.i18nService.setLanguage(language);
  }

  openCreateAccountModal(): void {
    this.isCreateAccountModalOpen = true;
    this.createAccountSubmitted = false;
    this.createAccountErrorMessage = '';
    this.createAccountSuccessMessage = '';
    this.createAccountForm.reset({
      username: '',
      password: '',
      role: 'VIEWER',
    });
  }

  closeCreateAccountModal(): void {
    this.isCreateAccountModalOpen = false;
  }

  async submitLogin(): Promise<void> {
    this.loginSubmitted = true;
    this.loginErrorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmittingLogin = true;

    try {
      await firstValueFrom(
        this.authService.login({
          username: this.loginForm.controls.username.value,
          password: this.loginForm.controls.password.value,
        }),
      );
      await this.router.navigateByUrl('/weeks');
    } catch (error) {
      this.loginErrorMessage = this.extractErrorMessage(error);
    } finally {
      this.isSubmittingLogin = false;
    }
  }

  async submitCreateAccount(): Promise<void> {
    this.createAccountSubmitted = true;
    this.createAccountErrorMessage = '';
    this.createAccountSuccessMessage = '';

    if (this.createAccountForm.invalid) {
      return;
    }

    this.isSubmittingCreateAccount = true;

    try {
      await firstValueFrom(
        this.authService.createAccount({
          username: this.createAccountForm.controls.username.value,
          password: this.createAccountForm.controls.password.value,
          role: this.createAccountForm.controls.role.value,
        }),
      );

      this.createAccountSuccessMessage = this.label('account.createSuccess');
      this.loginForm.patchValue({
        username: this.createAccountForm.controls.username.value,
        password: this.createAccountForm.controls.password.value,
      });
      this.createAccountForm.reset({
        username: '',
        password: '',
        role: 'VIEWER',
      });
      this.createAccountSubmitted = false;
    } catch (error) {
      this.createAccountErrorMessage = this.extractErrorMessage(error);
    } finally {
      this.isSubmittingCreateAccount = false;
    }
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return this.label('global.unknownError');
  }
}
