import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeoplePage, Person, PersonCreateRequest, PersonUpdateRequest } from '../models/person';
import { PeopleQuery } from '../models/requests';
import { API_PATHS } from './api-paths';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private readonly apiHttp: ApiHttpService) {}

  listPeople(query: PeopleQuery = {}): Observable<PeoplePage> {
    return this.apiHttp.request<PeoplePage>('GET', API_PATHS.people, undefined, query);
  }

  getPerson(personId: string): Observable<Person> {
    return this.apiHttp.request<Person>('GET', API_PATHS.personById(personId));
  }

  createPerson(request: PersonCreateRequest): Observable<Person> {
    return this.apiHttp.request<Person>('POST', API_PATHS.people, request);
  }

  updatePerson(personId: string, request: PersonUpdateRequest): Observable<Person> {
    return this.apiHttp.request<Person>('PUT', API_PATHS.personById(personId), request);
  }

  deletePerson(personId: string): Observable<void> {
    return this.apiHttp.request<void>('DELETE', API_PATHS.personById(personId));
  }
}
