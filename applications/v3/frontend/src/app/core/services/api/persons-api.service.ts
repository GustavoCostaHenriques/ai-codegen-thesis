import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AccountRole,
  CreatePersonRequest,
  PersonDetail,
  PersonPage,
  PersonStatus,
  UpdatePersonRequest,
} from '../../models/api.models';
import { environment } from '../../../../environments/environment';
import { toHttpParams } from './http-params.util';

export interface ListPersonsQuery {
  page?: number;
  size?: number;
  sort?: string[];
  search?: string;
  role?: AccountRole;
  status?: PersonStatus;
}

@Injectable({ providedIn: 'root' })
export class PersonsApiService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  listPersons(query: ListPersonsQuery) {
    return this.http.get<PersonPage>(`${this.apiBaseUrl}/persons`, {
      params: toHttpParams(query),
    });
  }

  getPersonById(personId: string) {
    return this.http.get<PersonDetail>(`${this.apiBaseUrl}/persons/${personId}`);
  }

  createPerson(request: CreatePersonRequest) {
    return this.http.post<PersonDetail>(`${this.apiBaseUrl}/persons`, request);
  }

  updatePersonById(personId: string, request: UpdatePersonRequest) {
    return this.http.put<PersonDetail>(`${this.apiBaseUrl}/persons/${personId}`, request);
  }

  deletePersonById(personId: string) {
    return this.http.delete<void>(`${this.apiBaseUrl}/persons/${personId}`);
  }
}
