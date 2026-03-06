import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreatePersonRequest,
  ListPersonsQuery,
  PersonDetail,
  PersonPage,
  UpdatePersonRequest
} from '../../models/api.models';
import { ApiUrlService } from '../api-url.service';
import { buildHttpParams } from '../http-query.util';

@Injectable({ providedIn: 'root' })
export class PersonsApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly apiUrl: ApiUrlService
  ) {}

  listPersons(query: ListPersonsQuery): Observable<PersonPage> {
    return this.http.get<PersonPage>(this.apiUrl.path('/persons'), {
      params: buildHttpParams(query)
    });
  }

  createPerson(payload: CreatePersonRequest): Observable<PersonDetail> {
    return this.http.post<PersonDetail>(this.apiUrl.path('/persons'), payload);
  }

  getPersonById(personId: string): Observable<PersonDetail> {
    return this.http.get<PersonDetail>(this.apiUrl.path(`/persons/${personId}`));
  }

  updatePersonById(personId: string, payload: UpdatePersonRequest): Observable<PersonDetail> {
    return this.http.put<PersonDetail>(this.apiUrl.path(`/persons/${personId}`), payload);
  }

  deletePersonById(personId: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl.path(`/persons/${personId}`));
  }
}
