import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as EmployeesActions from './employees.actions'
import { selectEmployees } from './employees.selectors';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesStateService {
  public employees$ = this.store.pipe(select(selectEmployees), share())

  constructor(
    private store: Store
  ) { }

  public loadEmployees(){
    this.store.dispatch(EmployeesActions.loadEmployees())
  }
}
