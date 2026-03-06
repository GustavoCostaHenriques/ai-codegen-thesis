import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthSessionStore } from '../services/auth-session.store';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const session = inject(AuthSessionStore);

  const token = session.token;
  if (!token) {
    return next(req);
  }

  const withToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(withToken);
};
