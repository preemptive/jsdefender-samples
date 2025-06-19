import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes,
  Login,
  LogInSuccess,
  LogInFailure,
  LogInFailureDob,
  LogOut
} from '../actions/auth.actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { People } from '../../models/people';

@Injectable()
export class AuthEffects {
  GetItem: Observable<People | null>;
  Login: Observable<Action>;
  LogInSuccess: Observable<never>;
  LogInFailure: Observable<LogInFailure>;
  LogInFailureDob: Observable<LogInFailureDob>;
  LogOut: Observable<never>;

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {
    this.GetItem = createEffect(() => this.actions.pipe(
      ofType(AuthActionTypes.GET_ITEM),
      switchMap(() => {
        return this.authService.getItem().pipe(
          catchError((error) => {
            return of(null);
          })
        );
      })
    ), { dispatch: false });

    this.Login = createEffect(() => this.actions.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: Login) => action.payload),
      switchMap(payload => {
        return this.authService.logIn(payload.username, payload.dob)
          .pipe(
            map((user) => {
              const resultlength = user.results.length;
              if (user.count > 0) {
                for (let i = 0; i < resultlength; i++) {
                  if (user.results[i].name === payload.username) {
                    if (user.results[i].birth_year === payload.dob) {
                      return new LogInSuccess({ token: user.token, username: payload.username });
                    } else {
                      return new LogInFailureDob({ error: 'DOB does not exist' });
                    }
                  }
                }
              } else {
                return new LogInFailure({ error: 'Username does not exist' });
              }
            }),
            catchError(() => of(new LogInFailure({ error: 'Username does not exist' })))
          );
      })
    ));

    this.LogInSuccess = createEffect(() => this.actions.pipe(
      ofType(AuthActionTypes.LOGIN_SUCCESS),
      tap(() => {
        this.router.navigateByUrl('/home');
      })
    ), { dispatch: false });

    this.LogInFailure = createEffect(() => this.actions.pipe(
      ofType(AuthActionTypes.LOGIN_FAILURE)
    ), { dispatch: false });

    this.LogInFailureDob = createEffect(() => this.actions.pipe(
      ofType(AuthActionTypes.LOGIN_FAILURE_DOB)
    ), { dispatch: false });

    this.LogOut = createEffect(() => this.actions.pipe(
      ofType(AuthActionTypes.LOGOUT),
      tap(() => {
        this.router.navigateByUrl('/');
      })
    ), { dispatch: false });
  }
}
