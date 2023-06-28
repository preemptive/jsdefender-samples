import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes,
  Login, LogInSuccess, LogInFailure, LogInFailureDob
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  GetItem = createEffect(() => this.actions.pipe(
    ofType(AuthActionTypes.GET_ITEM),
    switchMap(_ => this.authService.getItem())
  ), { dispatch: false });

  Login = createEffect(() => this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: Login) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload.username, payload.dob)
        .pipe(map((user) => {
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
        }))
        .pipe(catchError((error) => {
          return of(new LogInFailure({ error: 'Username does not exist' }));
        }));
    })
  ));


  LogInSuccess = createEffect(() => this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(() => {
      this.router.navigateByUrl('/home');
    })
  ), { dispatch: false });

  LogInFailure = createEffect(() => this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  ), { dispatch: false });

  LogInFailureDob = createEffect(() => this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE_DOB)
  ), { dispatch: false });

  LogOut = createEffect(() => this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      this.router.navigateByUrl('/');
    })
  ), { dispatch: false });
}
