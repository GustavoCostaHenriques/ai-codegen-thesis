import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthSessionStore } from '../services/auth-session.store';

export const authGuard: CanActivateFn = (_route, state) => {
  const session = inject(AuthSessionStore);
  const router = inject(Router);

  if (session.isAuthenticated) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};
