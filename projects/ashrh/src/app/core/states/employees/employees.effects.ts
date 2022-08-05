import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as EmployeesActions from './employees.actions';
import { EmployeeDbService } from './employee-db.service';



@Injectable()
export class EmployeesEffects {

  loadEmployees$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EmployeesActions.loadEmployees),
      concatMap(() =>
        this.employeeDbService.loadEmployees().pipe(
          map(data => EmployeesActions.loadEmployeesSuccess({ data })),
          catchError(error => of(EmployeesActions.loadEmployeesFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions, private employeeDbService: EmployeeDbService) {}

}
