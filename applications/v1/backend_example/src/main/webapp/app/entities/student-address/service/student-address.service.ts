import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStudentAddress, NewStudentAddress } from '../student-address.model';

export type PartialUpdateStudentAddress = Partial<IStudentAddress> & Pick<IStudentAddress, 'id'>;

export type EntityResponseType = HttpResponse<IStudentAddress>;
export type EntityArrayResponseType = HttpResponse<IStudentAddress[]>;

@Injectable({ providedIn: 'root' })
export class StudentAddressService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/student-addresses');

  create(studentAddress: NewStudentAddress): Observable<EntityResponseType> {
    return this.http.post<IStudentAddress>(this.resourceUrl, studentAddress, { observe: 'response' });
  }

  update(studentAddress: IStudentAddress): Observable<EntityResponseType> {
    return this.http.put<IStudentAddress>(`${this.resourceUrl}/${this.getStudentAddressIdentifier(studentAddress)}`, studentAddress, {
      observe: 'response',
    });
  }

  partialUpdate(studentAddress: PartialUpdateStudentAddress): Observable<EntityResponseType> {
    return this.http.patch<IStudentAddress>(`${this.resourceUrl}/${this.getStudentAddressIdentifier(studentAddress)}`, studentAddress, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStudentAddress>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStudentAddress[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStudentAddressIdentifier(studentAddress: Pick<IStudentAddress, 'id'>): number {
    return studentAddress.id;
  }

  compareStudentAddress(o1: Pick<IStudentAddress, 'id'> | null, o2: Pick<IStudentAddress, 'id'> | null): boolean {
    return o1 && o2 ? this.getStudentAddressIdentifier(o1) === this.getStudentAddressIdentifier(o2) : o1 === o2;
  }

  addStudentAddressToCollectionIfMissing<Type extends Pick<IStudentAddress, 'id'>>(
    studentAddressCollection: Type[],
    ...studentAddressesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const studentAddresses: Type[] = studentAddressesToCheck.filter(isPresent);
    if (studentAddresses.length > 0) {
      const studentAddressCollectionIdentifiers = studentAddressCollection.map(studentAddressItem =>
        this.getStudentAddressIdentifier(studentAddressItem),
      );
      const studentAddressesToAdd = studentAddresses.filter(studentAddressItem => {
        const studentAddressIdentifier = this.getStudentAddressIdentifier(studentAddressItem);
        if (studentAddressCollectionIdentifiers.includes(studentAddressIdentifier)) {
          return false;
        }
        studentAddressCollectionIdentifiers.push(studentAddressIdentifier);
        return true;
      });
      return [...studentAddressesToAdd, ...studentAddressCollection];
    }
    return studentAddressCollection;
  }
}
