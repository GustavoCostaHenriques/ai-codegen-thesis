import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrorResponse } from '../models/api.models';

export interface ParsedHttpError {
  message: string;
  fieldErrors: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class HttpErrorService {
  parse(error: unknown): ParsedHttpError {
    if (!(error instanceof HttpErrorResponse)) {
      return {
        message: 'Unexpected error.',
        fieldErrors: {},
      };
    }

    if (error.status === 0) {
      return {
        message: 'Network connection failed. Check that the backend is reachable.',
        fieldErrors: {},
      };
    }

    const fieldErrors: Record<string, string> = {};
    const response = error.error as Partial<ValidationErrorResponse> | undefined;

    if (Array.isArray(response?.fieldErrors)) {
      response.fieldErrors.forEach((fieldError) => {
        fieldErrors[fieldError.field] = fieldError.message;
      });
    }

    return {
      message: response?.message ?? error.statusText ?? 'Request failed.',
      fieldErrors,
    };
  }
}
