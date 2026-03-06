import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from './auth.service';
import { AuthStoreService } from '../../core/services/auth-store.service';

describe('LoginPageComponent', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let component: LoginPageComponent;
  let authService: {
    login: ReturnType<typeof vi.fn>;
    changePassword: ReturnType<typeof vi.fn>;
    logout: ReturnType<typeof vi.fn>;
    loadCurrentUser: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    authService = {
      login: vi.fn(),
      changePassword: vi.fn(),
      logout: vi.fn(),
      loadCurrentUser: vi.fn(),
    };
    authService.login.mockReturnValue(
      of({
        accessToken: 'token',
        tokenType: 'Bearer',
        expiresIn: 3600,
        user: {
          accountId: '1',
          personId: '2',
          name: 'Admin',
          username: 'admin',
          email: 'admin@weekly.local',
          role: 'ADMIN',
          status: 'ACTIVE',
        },
      }),
    );

    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [
        provideRouter([]),
        AuthStoreService,
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('validates required login fields before submitting', () => {
    component.submitLogin();

    expect(authService.login).not.toHaveBeenCalled();
    expect(component.loginForm.invalid).toBe(true);
  });

  it('submits valid credentials through the auth service', () => {
    component.loginForm.setValue({
      username: 'admin',
      password: 'admin12345',
    });

    component.submitLogin();

    expect(authService.login).toHaveBeenCalledWith({
      username: 'admin',
      password: 'admin12345',
    });
  });
});
