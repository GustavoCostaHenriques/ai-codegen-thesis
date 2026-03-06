import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWeek } from '../week.model';
import { WeekService } from '../service/week.service';

const weekResolve = (route: ActivatedRouteSnapshot): Observable<null | IWeek> => {
  const id = route.params.id;
  if (id) {
    return inject(WeekService)
      .find(id)
      .pipe(
        mergeMap((week: HttpResponse<IWeek>) => {
          if (week.body) {
            return of(week.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default weekResolve;
