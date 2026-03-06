import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthSessionStore } from '../services/auth-session.store';

export const publicOnlyGuard: CanActivateFn = () => {
  const session = inject(AuthSessionStore);
  const router = inject(Router);

  if (session.isAuthenticated) {
    return router.createUrlTree(['/weeks']);
  }

  return true;
};
