import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginPageComponent } from './login-page.component';
import { AccountsApiService } from '../../core/services/api/accounts-api.service';
import { AuthService } from '../../core/services/auth.service';

class AuthServiceMock {
  login = jasmine.createSpy('login').and.returnValue(
    of({
      accessToken: 'token',
      tokenType: 'Bearer',
      expiresIn: 3600,
      account: {
        accountId: 'a',
        personId: 'b',
        username: 'admin@weekly.local',
        name: 'Admin',
        email: 'admin@weekly.local',
        role: 'ADMIN',
        status: 'ACTIVE'
      }
    })
  );
}

class AccountsApiMock {
  registerAccount = jasmine.createSpy('registerAccount').and.returnValue(of(void 0));
  changePassword = jasmine.createSpy('changePassword').and.returnValue(of(void 0));
}

class RouterMock {
  navigateByUrl = jasmine.createSpy('navigateByUrl');
}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: AccountsApiService, useClass: AccountsApiMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({})
            }
          }
        },
        { provide: Router, useClass: RouterMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('marks login form controls as touched when invalid', () => {
    component.submitLogin();
    expect(component.loginForm.controls.username.touched).toBeTrue();
    expect(component.loginForm.controls.password.touched).toBeTrue();
  });

  it('maps backend login error', () => {
    const authService = TestBed.inject(AuthService) as unknown as AuthServiceMock;
    authService.login.and.returnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 401,
            error: { message: 'Invalid credentials', fieldErrors: [] }
          })
      )
    );

    component.loginForm.setValue({ username: 'wrong', password: 'wrongpass1' });
    component.submitLogin();

    expect(component.loginError?.message).toContain('Invalid credentials');
  });
});
