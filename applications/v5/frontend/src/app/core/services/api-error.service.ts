import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ErrorResponse,
  FieldError,
  ValidationErrorResponse,
} from '../../shared/models/api.models';

export interface ParsedApiError {
  status: number;
  message: string;
  fieldErrors: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class ApiErrorService {
  parse(error: unknown): ParsedApiError {
    if (!(error instanceof HttpErrorResponse)) {
      return {
        status: 0,
        message: 'Unexpected error. Please try again.',
        fieldErrors: {},
      };
    }

    const payload = error.error as
      | ErrorResponse
      | ValidationErrorResponse
      | undefined;
    const fallbackMessage =
      error.status === 0
        ? 'Network error. Please check your connection.'
        : 'Request failed. Please try again.';

    const fieldErrors = this.extractFieldErrors(payload);

    return {
      status: error.status,
      message: payload?.message ?? fallbackMessage,
      fieldErrors,
    };
  }

  private extractFieldErrors(
    payload: ErrorResponse | ValidationErrorResponse | undefined
  ): Record<string, string> {
    const errors = (payload as ValidationErrorResponse | undefined)?.fieldErrors;
    if (!errors || !Array.isArray(errors)) {
      return {};
    }

    return errors.reduce<Record<string, string>>((acc, item: FieldError) => {
      if (!acc[item.field]) {
        acc[item.field] = item.message;
      }
      return acc;
    }, {});
  }
}
