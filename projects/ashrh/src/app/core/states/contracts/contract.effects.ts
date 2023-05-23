import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as ContractsActions from './contracts.actions';
import { ContractEmployeeDbService } from './contract-db.service';

@Injectable()
export class EmployeesEffects {
  loadEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContractsActions.loadContractsEmployees),
      concatMap(() =>
        this.employeeDbService.loadContractsEmployee().pipe(
          map((data) =>
            ContractsActions.loadContractsEmployeesSuccess({ data })
          ),
          catchError((error) =>
            of(ContractsActions.loadContractsEmployeesFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private employeeDbService: ContractEmployeeDbService
  ) {}
}
