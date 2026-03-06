import { HttpParams } from '@angular/common/http';

export function buildHttpParams<T extends object>(query: T): HttpParams {
  let params = new HttpParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        params = params.append(key, String(item));
      });
      return;
    }

    params = params.set(key, String(value));
  });

  return params;
}
