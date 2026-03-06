import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDayUser } from '../day-user.model';
import { DayUserService } from '../service/day-user.service';

const dayUserResolve = (route: ActivatedRouteSnapshot): Observable<null | IDayUser> => {
  const id = route.params.id;
  if (id) {
    return inject(DayUserService)
      .find(id)
      .pipe(
        mergeMap((dayUser: HttpResponse<IDayUser>) => {
          if (dayUser.body) {
            return of(dayUser.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default dayUserResolve;
