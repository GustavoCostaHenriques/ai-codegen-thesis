import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = () => {
  const sessionService = inject(SessionService);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!sessionService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  if (sessionService.account()) {
    return true;
  }

  return authService.refreshCurrentAccount().pipe(
    map(() => true),
    catchError(() => {
      sessionService.clearSession();
      return of(router.createUrlTree(['/login']));
    }),
  );
};
