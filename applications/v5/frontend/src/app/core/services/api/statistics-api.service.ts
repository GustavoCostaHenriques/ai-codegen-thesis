import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StatisticsApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  createStatisticsExport(): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/statistics-exports`, null, {
      responseType: 'blob',
    });
  }
}
