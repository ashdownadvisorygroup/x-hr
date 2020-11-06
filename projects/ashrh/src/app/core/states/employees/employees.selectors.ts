import { selectEmployeesState } from '../../core.state';
import { createSelector } from '@ngrx/store';

export const selectEmployees = createSelector(selectEmployeesState, (state) => state.employees)
