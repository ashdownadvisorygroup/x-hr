import { createAction, props } from '@ngrx/store';

export const loadContractsEmployees = createAction(
  '[ContractsEmployees] ContractsEmployees'
);

export const loadContractsEmployeesSuccess = createAction(
  '[ContractsEmployees] Load ContractsEmployees Success',
  props<{ data: any }>()
);

export const loadContractsEmployeesFailure = createAction(
  '[ContractsEmployees] Load ContractsEmployees Failure',
  props<{ error: any }>()
);
