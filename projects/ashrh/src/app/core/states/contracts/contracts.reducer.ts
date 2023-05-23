import { Action, createReducer, on } from '@ngrx/store';
import * as ContractsEmployeesActions from './contracts.actions';

export const contractsEmployeesReducer = createReducer(
  {},
  on(
    ContractsEmployeesActions.loadContractsEmployeesSuccess,
    (state, { data }) => ({ ...state, contractEmployees: data })
  )
);
