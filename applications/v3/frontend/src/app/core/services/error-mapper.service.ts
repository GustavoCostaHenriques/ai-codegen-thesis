import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { ErrorResponse } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class ErrorMapperService {
  constructor(private readonly i18nService: I18nService) {}

  getMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      const payload = error.error as ErrorResponse | null;
      if (payload?.message) {
        return payload.message;
      }

      if (error.status === 0) {
        return this.i18nService.translate('common.networkError');
      }
    }

    return fallback;
  }

  getFieldErrors(error: unknown): Record<string, string> {
    if (!(error instanceof HttpErrorResponse)) {
      return {};
    }

    const payload = error.error as ErrorResponse | null;
    if (!payload?.fieldErrors?.length) {
      return {};
    }

    const fieldErrors: Record<string, string> = {};
    for (const fieldError of payload.fieldErrors) {
      fieldErrors[fieldError.field] = fieldError.message;
    }

    return fieldErrors;
  }
}
