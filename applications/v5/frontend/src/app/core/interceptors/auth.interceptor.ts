import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStateService } from '../services/auth-state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authStateService: AuthStateService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authStateService.getAccessToken();

    if (!token || req.url.endsWith('/sessions')) {
      return next.handle(req);
    }

    return next.handle(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }
}
