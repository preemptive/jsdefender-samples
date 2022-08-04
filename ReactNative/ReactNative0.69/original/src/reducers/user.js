import {
  SET_USER,
  REMOVE_USER,
  GET_USER_PENDING,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_PLANETS_PENDING,
  GET_PLANETS_SUCCESS,
} from '../actions/user';

export const initialState = {
  name: '',
  planets: [],
  pending: false,
  loaded: false,
  loggingIn: false,
  planetsLoaded: false,
  fetchingPlanets: false,
  error: '',
};

/**
 * Redux reducer to add/remove user in store
 */
const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        name: action.name,
        pending: false,
        loaded: true,
      };
    case REMOVE_USER:
      return {
        ...state,
        name: '',
        loaded: true,
      };
    case GET_USER_PENDING:
      return {
        ...state,
        pending: true,
      }
    case LOGIN_PENDING:
      return {
        ...state,
        error: '',
        loggingIn: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        error: '',
        name: action.name,
        loaded: true,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loggingIn: false,
        error: action.error,
      }
    case GET_PLANETS_PENDING:
      return {
        ...state,
        fetchingPlanets: true,
      }
    case GET_PLANETS_SUCCESS:
      return {
        ...state,
        fetchingPlanets: false,
        planetsLoaded: true,
        planets: action.planets,
      }
    default:
      return state;
  }
}

export default user;