import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountRole } from '../models/api.models';
import { AuthSessionStore } from '../services/auth-session.store';

export const roleGuard: CanActivateFn = (route) => {
  const session = inject(AuthSessionStore);
  const router = inject(Router);

  const allowedRoles = (route.data['roles'] as AccountRole[] | undefined) ?? [];
  if (allowedRoles.length === 0) {
    return true;
  }

  const currentRole = session.account?.role;
  if (currentRole && allowedRoles.includes(currentRole)) {
    return true;
  }

  return router.createUrlTree(['/weeks']);
};
