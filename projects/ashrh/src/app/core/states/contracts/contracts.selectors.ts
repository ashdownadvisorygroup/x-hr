import { selectContractsEmployeesState } from '../../core.state';
import { createSelector } from '@ngrx/store';

export const selectContarctEmployees = createSelector(
  selectContractsEmployeesState,
  (state) => state.contractsEmployees
);
