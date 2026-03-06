import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStoreService } from '../services/auth-store.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthStoreService).accessToken();

  if (!token || request.url.endsWith('/sessions')) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
