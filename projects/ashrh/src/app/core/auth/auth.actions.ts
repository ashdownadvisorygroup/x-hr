import { createAction, props } from '@ngrx/store';

export const authLogin = createAction('[Auth] Login', props<{user: any}>());
export const authLogout = createAction('[Auth] Logout');
