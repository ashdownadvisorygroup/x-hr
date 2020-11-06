import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import { authLogin, authLogout } from './auth.actions';
import { AppRoutes } from '../../modeles/app-routes';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  // login = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(authLogin),
  //       tap(() =>
  //
  //       )
  //     ),
  //   { dispatch: false }
  // );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap(() => {
          this.router.navigate(['/' + AppRoutes.login]);
          localStorage.clear()
        })
      ),
    { dispatch: false }
  );
}
