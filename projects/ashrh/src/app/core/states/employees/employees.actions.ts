import { createAction, props } from '@ngrx/store';

export const loadEmployees = createAction(
  '[Employees] Load Employees'
);

export const loadEmployeesSuccess = createAction(
  '[Employees] Load Employees Success',
  props<{ data: any }>()
);

export const loadEmployeesFailure = createAction(
  '[Employees] Load Employees Failure',
  props<{ error: any }>()
);
