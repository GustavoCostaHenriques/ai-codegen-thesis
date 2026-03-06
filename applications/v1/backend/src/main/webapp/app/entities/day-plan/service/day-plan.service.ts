import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDayPlan, NewDayPlan } from '../day-plan.model';

export type PartialUpdateDayPlan = Partial<IDayPlan> & Pick<IDayPlan, 'id'>;

type RestOf<T extends IDayPlan | NewDayPlan> = Omit<T, 'date'> & {
  date?: string | null;
};

export type RestDayPlan = RestOf<IDayPlan>;

export type NewRestDayPlan = RestOf<NewDayPlan>;

export type PartialUpdateRestDayPlan = RestOf<PartialUpdateDayPlan>;

export type EntityResponseType = HttpResponse<IDayPlan>;
export type EntityArrayResponseType = HttpResponse<IDayPlan[]>;

@Injectable({ providedIn: 'root' })
export class DayPlanService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/day-plans');

  create(dayPlan: NewDayPlan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dayPlan);
    return this.http
      .post<RestDayPlan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(dayPlan: IDayPlan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dayPlan);
    return this.http
      .put<RestDayPlan>(`${this.resourceUrl}/${this.getDayPlanIdentifier(dayPlan)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(dayPlan: PartialUpdateDayPlan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dayPlan);
    return this.http
      .patch<RestDayPlan>(`${this.resourceUrl}/${this.getDayPlanIdentifier(dayPlan)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDayPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDayPlan[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDayPlanIdentifier(dayPlan: Pick<IDayPlan, 'id'>): number {
    return dayPlan.id;
  }

  compareDayPlan(o1: Pick<IDayPlan, 'id'> | null, o2: Pick<IDayPlan, 'id'> | null): boolean {
    return o1 && o2 ? this.getDayPlanIdentifier(o1) === this.getDayPlanIdentifier(o2) : o1 === o2;
  }

  addDayPlanToCollectionIfMissing<Type extends Pick<IDayPlan, 'id'>>(
    dayPlanCollection: Type[],
    ...dayPlansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dayPlans: Type[] = dayPlansToCheck.filter(isPresent);
    if (dayPlans.length > 0) {
      const dayPlanCollectionIdentifiers = dayPlanCollection.map(dayPlanItem => this.getDayPlanIdentifier(dayPlanItem));
      const dayPlansToAdd = dayPlans.filter(dayPlanItem => {
        const dayPlanIdentifier = this.getDayPlanIdentifier(dayPlanItem);
        if (dayPlanCollectionIdentifiers.includes(dayPlanIdentifier)) {
          return false;
        }
        dayPlanCollectionIdentifiers.push(dayPlanIdentifier);
        return true;
      });
      return [...dayPlansToAdd, ...dayPlanCollection];
    }
    return dayPlanCollection;
  }

  protected convertDateFromClient<T extends IDayPlan | NewDayPlan | PartialUpdateDayPlan>(dayPlan: T): RestOf<T> {
    return {
      ...dayPlan,
      date: dayPlan.date?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDayPlan: RestDayPlan): IDayPlan {
    return {
      ...restDayPlan,
      date: restDayPlan.date ? dayjs(restDayPlan.date) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDayPlan>): HttpResponse<IDayPlan> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDayPlan[]>): HttpResponse<IDayPlan[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
