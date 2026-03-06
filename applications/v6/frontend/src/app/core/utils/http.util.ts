import { HttpParams } from '@angular/common/http';

export function buildHttpParams(params: Record<string, string | number | string[] | null | undefined>): HttpParams {
  let httpParams = new HttpParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((entry) => {
        httpParams = httpParams.append(key, entry);
      });
      return;
    }

    httpParams = httpParams.set(key, String(value));
  });

  return httpParams;
}
