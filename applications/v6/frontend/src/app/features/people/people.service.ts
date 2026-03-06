import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PagedPeople,
  PeopleQuery,
  Person,
  PersonCreateRequest,
  PersonUpdateRequest,
} from '../../core/models/api.models';
import { buildHttpParams } from '../../core/utils/http.util';

@Injectable({ providedIn: 'root' })
export class PeopleService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiBaseUrl;

  listPeople(query: PeopleQuery): Observable<PagedPeople> {
    return this.http.get<PagedPeople>(`${this.apiBaseUrl}/people`, {
      params: buildHttpParams({
        page: query.page,
        size: query.size,
        search: query.search,
        sort: query.sort,
        status: query.status,
        role: query.role,
      }),
    });
  }

  getPerson(personId: string): Observable<Person> {
    return this.http.get<Person>(`${this.apiBaseUrl}/people/${personId}`);
  }

  createPerson(payload: PersonCreateRequest): Observable<Person> {
    return this.http.post<Person>(`${this.apiBaseUrl}/people`, payload);
  }

  updatePerson(personId: string, payload: PersonUpdateRequest): Observable<Person> {
    return this.http.put<Person>(`${this.apiBaseUrl}/people/${personId}`, payload);
  }

  deletePerson(personId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/people/${personId}`);
  }
}
