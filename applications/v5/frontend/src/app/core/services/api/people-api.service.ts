import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  PagedPeople,
  Person,
  PersonCreateRequest,
  PersonUpdateRequest,
} from '../../../shared/models/api.models';
import { PeopleQuery } from '../../../shared/models/query.models';
import { buildHttpParams } from './http-query.util';

@Injectable({ providedIn: 'root' })
export class PeopleApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  listPeople(query: PeopleQuery = {}): Observable<PagedPeople> {
    return this.http.get<PagedPeople>(`${this.baseUrl}/people`, {
      params: buildHttpParams(query),
    });
  }

  createPerson(payload: PersonCreateRequest): Observable<Person> {
    return this.http.post<Person>(`${this.baseUrl}/people`, payload);
  }

  getPersonById(personId: string): Observable<Person> {
    return this.http.get<Person>(`${this.baseUrl}/people/${personId}`);
  }

  updatePerson(personId: string, payload: PersonUpdateRequest): Observable<Person> {
    return this.http.put<Person>(`${this.baseUrl}/people/${personId}`, payload);
  }

  deletePerson(personId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/people/${personId}`);
  }
}
