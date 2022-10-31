import { User } from '../../models/user';
import { AuthActionTypes, All } from '../actions/auth.actions';


export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
  loading: any;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
  loading: false
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: {
          token: action.payload.token,
          username: action.payload.username
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        loading: true,
        errorMessage: 'Username does not exist'
      };
    }
    case AuthActionTypes.LOGIN_FAILURE_DOB: {
      return {
        ...state,
        loading: true,
        errorMessage: 'DOB does not exist'
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
