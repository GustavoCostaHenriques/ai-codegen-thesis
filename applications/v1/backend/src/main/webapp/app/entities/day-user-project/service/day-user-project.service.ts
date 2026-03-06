import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDayUserProject, NewDayUserProject } from '../day-user-project.model';

export type PartialUpdateDayUserProject = Partial<IDayUserProject> & Pick<IDayUserProject, 'id'>;

export type EntityResponseType = HttpResponse<IDayUserProject>;
export type EntityArrayResponseType = HttpResponse<IDayUserProject[]>;

@Injectable({ providedIn: 'root' })
export class DayUserProjectService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/day-user-projects');

  create(dayUserProject: NewDayUserProject): Observable<EntityResponseType> {
    return this.http.post<IDayUserProject>(this.resourceUrl, dayUserProject, { observe: 'response' });
  }

  update(dayUserProject: IDayUserProject): Observable<EntityResponseType> {
    return this.http.put<IDayUserProject>(`${this.resourceUrl}/${this.getDayUserProjectIdentifier(dayUserProject)}`, dayUserProject, {
      observe: 'response',
    });
  }

  partialUpdate(dayUserProject: PartialUpdateDayUserProject): Observable<EntityResponseType> {
    return this.http.patch<IDayUserProject>(`${this.resourceUrl}/${this.getDayUserProjectIdentifier(dayUserProject)}`, dayUserProject, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDayUserProject>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDayUserProject[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDayUserProjectIdentifier(dayUserProject: Pick<IDayUserProject, 'id'>): number {
    return dayUserProject.id;
  }

  compareDayUserProject(o1: Pick<IDayUserProject, 'id'> | null, o2: Pick<IDayUserProject, 'id'> | null): boolean {
    return o1 && o2 ? this.getDayUserProjectIdentifier(o1) === this.getDayUserProjectIdentifier(o2) : o1 === o2;
  }

  addDayUserProjectToCollectionIfMissing<Type extends Pick<IDayUserProject, 'id'>>(
    dayUserProjectCollection: Type[],
    ...dayUserProjectsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dayUserProjects: Type[] = dayUserProjectsToCheck.filter(isPresent);
    if (dayUserProjects.length > 0) {
      const dayUserProjectCollectionIdentifiers = dayUserProjectCollection.map(dayUserProjectItem =>
        this.getDayUserProjectIdentifier(dayUserProjectItem),
      );
      const dayUserProjectsToAdd = dayUserProjects.filter(dayUserProjectItem => {
        const dayUserProjectIdentifier = this.getDayUserProjectIdentifier(dayUserProjectItem);
        if (dayUserProjectCollectionIdentifiers.includes(dayUserProjectIdentifier)) {
          return false;
        }
        dayUserProjectCollectionIdentifiers.push(dayUserProjectIdentifier);
        return true;
      });
      return [...dayUserProjectsToAdd, ...dayUserProjectCollection];
    }
    return dayUserProjectCollection;
  }
}
