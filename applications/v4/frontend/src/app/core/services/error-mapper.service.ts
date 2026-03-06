import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorResponse } from '../models/api.models';

export interface UiError {
  message: string;
  status: number;
  fieldErrors: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class ErrorMapperService {
  map(error: unknown): UiError {
    if (error instanceof HttpErrorResponse) {
      const payload = error.error as Partial<ErrorResponse> | undefined;
      const fieldErrors: Record<string, string> = {};

      payload?.fieldErrors?.forEach((fieldError) => {
        if (fieldError.field && fieldError.message) {
          fieldErrors[fieldError.field] = fieldError.message;
        }
      });

      return {
        message: payload?.message || payload?.error || error.message || 'Unexpected error',
        status: error.status,
        fieldErrors
      };
    }

    return {
      message: 'Network or unknown error',
      status: 0,
      fieldErrors: {}
    };
  }
}
