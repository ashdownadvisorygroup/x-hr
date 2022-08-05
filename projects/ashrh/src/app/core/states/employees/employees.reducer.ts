import { Action, createReducer, on } from '@ngrx/store';
import * as EmployeesActions from './employees.actions';

export const employeesReducer = createReducer(
  {} ,
  on(EmployeesActions.loadEmployeesSuccess, (state, {data}) => ({ ...state, employees: data })),
);

