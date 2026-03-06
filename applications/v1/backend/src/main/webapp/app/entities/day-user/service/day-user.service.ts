import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDayUser, NewDayUser } from '../day-user.model';

export type PartialUpdateDayUser = Partial<IDayUser> & Pick<IDayUser, 'id'>;

export type EntityResponseType = HttpResponse<IDayUser>;
export type EntityArrayResponseType = HttpResponse<IDayUser[]>;

@Injectable({ providedIn: 'root' })
export class DayUserService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/day-users');

  create(dayUser: NewDayUser): Observable<EntityResponseType> {
    return this.http.post<IDayUser>(this.resourceUrl, dayUser, { observe: 'response' });
  }

  update(dayUser: IDayUser): Observable<EntityResponseType> {
    return this.http.put<IDayUser>(`${this.resourceUrl}/${this.getDayUserIdentifier(dayUser)}`, dayUser, { observe: 'response' });
  }

  partialUpdate(dayUser: PartialUpdateDayUser): Observable<EntityResponseType> {
    return this.http.patch<IDayUser>(`${this.resourceUrl}/${this.getDayUserIdentifier(dayUser)}`, dayUser, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDayUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDayUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDayUserIdentifier(dayUser: Pick<IDayUser, 'id'>): number {
    return dayUser.id;
  }

  compareDayUser(o1: Pick<IDayUser, 'id'> | null, o2: Pick<IDayUser, 'id'> | null): boolean {
    return o1 && o2 ? this.getDayUserIdentifier(o1) === this.getDayUserIdentifier(o2) : o1 === o2;
  }

  addDayUserToCollectionIfMissing<Type extends Pick<IDayUser, 'id'>>(
    dayUserCollection: Type[],
    ...dayUsersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dayUsers: Type[] = dayUsersToCheck.filter(isPresent);
    if (dayUsers.length > 0) {
      const dayUserCollectionIdentifiers = dayUserCollection.map(dayUserItem => this.getDayUserIdentifier(dayUserItem));
      const dayUsersToAdd = dayUsers.filter(dayUserItem => {
        const dayUserIdentifier = this.getDayUserIdentifier(dayUserItem);
        if (dayUserCollectionIdentifiers.includes(dayUserIdentifier)) {
          return false;
        }
        dayUserCollectionIdentifiers.push(dayUserIdentifier);
        return true;
      });
      return [...dayUsersToAdd, ...dayUserCollection];
    }
    return dayUserCollection;
  }
}
