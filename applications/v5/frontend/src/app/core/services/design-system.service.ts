import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DesignSystemService {
  private loaded = false;

  load(): Promise<void> {
    if (this.loaded) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = '/assets/main.js';
      script.async = true;

      script.onload = () => {
        this.loaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Failed to load design-system script'));
      };

      document.body.appendChild(script);
    });
  }
}
