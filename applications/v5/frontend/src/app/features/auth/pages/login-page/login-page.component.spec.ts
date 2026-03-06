import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiErrorService } from '../../../../core/services/api-error.service';
import { AuthStateService } from '../../../../core/services/auth-state.service';
import { EventLogService } from '../../../../core/services/event-log.service';
import { AuthApiService } from '../../../../core/services/api/auth-api.service';
import { ProfileApiService } from '../../../../core/services/api/profile-api.service';
import { SharedModule } from '../../../../shared/shared.module';
import { I18nService } from '../../../../shared/services/i18n.service';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  const authApiSpy = jasmine.createSpyObj<AuthApiService>('AuthApiService', [
    'createSession',
    'createPasswordChange',
  ]);
  const profileApiSpy = jasmine.createSpyObj<ProfileApiService>('ProfileApiService', [
    'getCurrentUser',
  ]);
  const authStateSpy = jasmine.createSpyObj<AuthStateService>('AuthStateService', [
    'isAuthenticated',
    'setSession',
    'setCurrentUser',
  ]);
  const apiErrorSpy = jasmine.createSpyObj<ApiErrorService>('ApiErrorService', ['parse']);
  const eventLogSpy = jasmine.createSpyObj<EventLogService>('EventLogService', ['log']);

  beforeEach(async () => {
    authStateSpy.isAuthenticated.and.returnValue(false);
    authApiSpy.createSession.and.returnValue(
      of({
        accessToken: 'token',
        tokenType: 'Bearer',
        expiresIn: 3600,
        user: {
          accountId: '00000000-0000-0000-0000-000000000001',
          personId: '00000000-0000-0000-0000-000000000002',
          name: 'Admin',
          username: 'admin',
          email: 'admin@weekly.local',
          role: 'ADMIN',
          status: 'ACTIVE',
        },
      })
    );
    profileApiSpy.getCurrentUser.and.returnValue(
      of({
        accountId: '00000000-0000-0000-0000-000000000001',
        personId: '00000000-0000-0000-0000-000000000002',
        name: 'Admin',
        username: 'admin',
        email: 'admin@weekly.local',
        role: 'ADMIN',
        status: 'ACTIVE',
      })
    );
    apiErrorSpy.parse.and.returnValue({
      status: 400,
      message: 'Error',
      fieldErrors: {},
    });

    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, SharedModule],
      providers: [
        I18nService,
        { provide: AuthApiService, useValue: authApiSpy },
        { provide: ProfileApiService, useValue: profileApiSpy },
        { provide: AuthStateService, useValue: authStateSpy },
        { provide: ApiErrorService, useValue: apiErrorSpy },
        { provide: EventLogService, useValue: eventLogSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep form invalid when fields are empty', () => {
    component.login();
    expect(component.loginForm.invalid).toBeTrue();
    expect(authApiSpy.createSession).not.toHaveBeenCalled();
  });
});
