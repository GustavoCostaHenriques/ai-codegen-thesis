import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDayUserProject } from '../day-user-project.model';
import { DayUserProjectService } from '../service/day-user-project.service';

const dayUserProjectResolve = (route: ActivatedRouteSnapshot): Observable<null | IDayUserProject> => {
  const id = route.params.id;
  if (id) {
    return inject(DayUserProjectService)
      .find(id)
      .pipe(
        mergeMap((dayUserProject: HttpResponse<IDayUserProject>) => {
          if (dayUserProject.body) {
            return of(dayUserProject.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default dayUserProjectResolve;
