import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStudentAddress } from '../student-address.model';
import { StudentAddressService } from '../service/student-address.service';

const studentAddressResolve = (route: ActivatedRouteSnapshot): Observable<null | IStudentAddress> => {
  const id = route.params.id;
  if (id) {
    return inject(StudentAddressService)
      .find(id)
      .pipe(
        mergeMap((studentAddress: HttpResponse<IStudentAddress>) => {
          if (studentAddress.body) {
            return of(studentAddress.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default studentAddressResolve;
