import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGIN_FAILURE_DOB = '[Auth] Login Failure Dob',
  LOGOUT = '[Auth] Logout',
  GET_USER = '[Auth] GetUser'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) { }
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) { }
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) { }
}

export class LogInFailureDob implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE_DOB;
  constructor(public payload: any) { }
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GET_USER;
}

export type All =
  | Login
  | LogInSuccess
  | LogInFailure
  | LogInFailureDob
  | LogOut
  | GetUser;
