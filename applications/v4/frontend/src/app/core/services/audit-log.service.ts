import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuditLogService {
  log(event: string, payload?: unknown): void {
    const entry = {
      event,
      payload,
      timestamp: new Date().toISOString()
    };

    // Diagnostic-only accounting at UI level; backend remains audit authority.
    console.info('[ui-audit]', entry);
  }
}
