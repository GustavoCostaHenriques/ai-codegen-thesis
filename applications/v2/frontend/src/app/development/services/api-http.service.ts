import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { API_BASE_PATH, HttpMethod } from './api-paths';

type QueryParams = Record<string, string | number | boolean | string[] | undefined>;

interface ErrorPayload {
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  constructor(private readonly http: HttpClient) {}

  request<T>(method: HttpMethod, path: string, body?: unknown, query?: QueryParams): Observable<T> {
    const params = this.buildHttpParams(query);
    const options: {
      body?: unknown;
      params?: HttpParams;
    } = {};

    if (body !== undefined) {
      options.body = body;
    }

    if (params.keys().length > 0) {
      options.params = params;
    }

    return this.http.request<T>(method, this.buildUrl(path), options).pipe(
      catchError(error => {
        const normalized = this.normalizeError(error);
        console.error('[ApiHttpService]', normalized.message);
        return throwError(() => normalized);
      }),
    );
  }

  private buildUrl(path: string): string {
    const basePath = API_BASE_PATH.endsWith('/') ? API_BASE_PATH.slice(0, -1) : API_BASE_PATH;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${basePath}${normalizedPath}`;
  }

  private buildHttpParams(query?: QueryParams): HttpParams {
    let params = new HttpParams();

    if (!query) {
      return params;
    }

    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach(item => {
          params = params.append(key, String(item));
        });
        return;
      }

      params = params.set(key, String(value));
    });

    return params;
  }

  private normalizeError(error: unknown): Error {
    if (error instanceof HttpErrorResponse) {
      const errorPayload = this.toErrorPayload(error.error);
      const payloadMessage = errorPayload?.message?.trim();
      const message = payloadMessage || (typeof error.error === 'string' ? error.error : '').trim();

      if (message) {
        return new Error(message);
      }

      if (error.status === 0) {
        return new Error('Unable to reach the API.');
      }

      return new Error(`Request failed (${error.status}).`);
    }

    if (error instanceof Error) {
      return error;
    }

    return new Error('An unexpected error occurred.');
  }

  private toErrorPayload(payload: unknown): ErrorPayload | null {
    if (typeof payload !== 'object' || payload === null) {
      return null;
    }

    return payload as ErrorPayload;
  }
}
