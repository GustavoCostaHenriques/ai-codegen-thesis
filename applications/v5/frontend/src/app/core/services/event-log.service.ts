import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventLogService {
  log(event: string, details?: unknown): void {
    const timestamp = new Date().toISOString();
    // Optional client-side diagnostics for accounting-related traces.
    console.info(`[ui-event][${timestamp}] ${event}`, details ?? '');
  }
}
