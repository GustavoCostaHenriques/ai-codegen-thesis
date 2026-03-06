import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(
    private readonly authStateService: AuthStateService,
    private readonly router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    return this.authStateService.isAuthenticated()
      ? this.router.createUrlTree(['/weeks'])
      : true;
  }
}
