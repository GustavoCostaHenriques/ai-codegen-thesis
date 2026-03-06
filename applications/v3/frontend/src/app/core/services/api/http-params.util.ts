import { HttpParams } from '@angular/common/http';

export type QueryValue = string | number | boolean | null | undefined | string[];

export function toHttpParams<T extends object>(values: T): HttpParams {
  let params = new HttpParams();

  for (const [key, value] of Object.entries(values as Record<string, QueryValue>)) {
    if (value === undefined || value === null || value === '') {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        params = params.append(key, item);
      }
      continue;
    }

    params = params.set(key, String(value));
  }

  return params;
}
