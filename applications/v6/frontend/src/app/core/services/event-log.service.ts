import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventLogService {
  log(eventName: string, details?: unknown): void {
    if (environment.production) {
      return;
    }

    if (details !== undefined) {
      console.info(`[accounting] ${eventName}`, details);
      return;
    }

    console.info(`[accounting] ${eventName}`);
  }
}
