import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  const authServiceMock = {
    login: jasmine.createSpy('login').and.returnValue(of({})),
    registerAccount: jasmine.createSpy('registerAccount').and.returnValue(of({})),
    changePassword: jasmine.createSpy('changePassword').and.returnValue(of(void 0)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([]), { provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render login title and actions', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Login');
    expect(compiled.textContent).toContain('Create Account');
  });
});
