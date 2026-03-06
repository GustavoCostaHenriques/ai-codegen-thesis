import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SessionService } from '../services/session.service';

const PUBLIC_ENDPOINT_SUFFIXES = ['/auth/sessions', '/accounts', '/password-changes'];

function isPublicRequest(request: HttpRequest<unknown>): boolean {
  return PUBLIC_ENDPOINT_SUFFIXES.some((suffix) => request.url.endsWith(suffix));
}

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);
  const token = sessionService.token();

  const needsAuthHeader = Boolean(token) && !isPublicRequest(request);
  const requestWithAuth = needsAuthHeader
    ? request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : request;

  return next(requestWithAuth).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && sessionService.isAuthenticated()) {
        sessionService.clearSession();
        void router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};
