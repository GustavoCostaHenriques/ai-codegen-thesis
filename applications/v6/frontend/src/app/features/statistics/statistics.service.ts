import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiBaseUrl;

  exportStatistics(): Observable<Blob> {
    return this.http.post(`${this.apiBaseUrl}/statistics-exports`, null, {
      responseType: 'blob',
    });
  }
}
