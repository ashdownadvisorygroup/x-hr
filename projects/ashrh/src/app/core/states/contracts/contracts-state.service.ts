import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ContractsActions from './contracts.actions';
import { selectContarctEmployees } from './contracts.selectors';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContractsStateService {
  public contracts$ = this.store.pipe(select(selectContarctEmployees), share());

  constructor(private store: Store) {}

  public loadContractsEmployee() {
    this.store.dispatch(ContractsActions.loadContractsEmployees());
  }
}
