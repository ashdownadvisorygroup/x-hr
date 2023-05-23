import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '../../environments/environment';

import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { AuthState } from './auth/auth.models';
import { authReducer } from './auth/auth.reducer';
import { RouterStateUrl } from './router/router.state';
import { settingsReducer } from './settings/settings.reducer';
import { SettingsState } from './settings/settings.model';
import * as fromEmployees from './states/employees/employees.reducer';
import { employeesReducer } from './states/employees/employees.reducer';
import { contractsEmployeesReducer } from './states/contracts/contracts.reducer';

export const reducers: ActionReducerMap<AppState> = {
  user: authReducer,
  employees: employeesReducer,
  contractsEmployees: contractsEmployeesReducer,
  settings: settingsReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];

if (!environment.production) {
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'user'
);

export const selectSettingsState = createFeatureSelector<
  AppState,
  SettingsState
>('settings');

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export const selectEmployeesState = createFeatureSelector<AppState, any>(
  'employees'
);

export const selectContractsEmployeesState = createFeatureSelector<
  AppState,
  any
>('contractsEmployees');
export interface AppState {
  user: AuthState;
  employees: any;
  contractsEmployees: any;
  settings: SettingsState;
  router: RouterReducerState<RouterStateUrl>;
}
