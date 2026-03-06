import { HttpParams } from '@angular/common/http';

export function buildHttpParams(query: object): HttpParams {
  let params = new HttpParams();

  Object.entries(query as Record<string, unknown>).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    ) {
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
