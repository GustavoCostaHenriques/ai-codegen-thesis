import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDayPlan } from '../day-plan.model';
import { DayPlanService } from '../service/day-plan.service';

const dayPlanResolve = (route: ActivatedRouteSnapshot): Observable<null | IDayPlan> => {
  const id = route.params.id;
  if (id) {
    return inject(DayPlanService)
      .find(id)
      .pipe(
        mergeMap((dayPlan: HttpResponse<IDayPlan>) => {
          if (dayPlan.body) {
            return of(dayPlan.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default dayPlanResolve;
