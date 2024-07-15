import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPlanetData, getUserProfile } from '../api';

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const GET_USER_PENDING = 'GET_USER_PENDING';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const GET_PLANETS_PENDING = 'GET_PLANETS_PENDING';
export const GET_PLANETS_SUCCESS = 'GET_PLANETS_SUCCESS';

/**
 * Redux action to add user to store
 */
export default function setUser(name) {
  return {
    type: SET_USER,
    name: name,
  };
}

/**
 * Redux action to remove user to store
 */
export function removeUser() {
  return {
    type: REMOVE_USER,
  };
}

export function getUserPending() {
  return {
    type: GET_USER_PENDING,
  };
}

export const loginPending = () => ({
  type: LOGIN_PENDING,
});

export const loginSuccess = (name) => ({
  type: LOGIN_SUCCESS,
  name,
});

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  error,
})

export const getPlanetsPending = () => ({
  type: GET_PLANETS_PENDING,
});

export const getPlanetsSuccess = (planets) => ({
  type: GET_PLANETS_SUCCESS,
  planets,
});

export const fetchUser = () =>
  async (dispatch) => {
    dispatch(getUserPending());
    let username = '';
    try {
      username = await AsyncStorage.getItem('username');
    } catch (e) {
      console.log(e);
    }

    if (username === null) {
      username = '';
    }

    dispatch(setUser(username));
    dispatch(getPlanets());
  };

export const login = (username, dob) =>
  async (dispatch) => {
    dispatch(loginPending());
    getUserProfile(username).
      then(async (response) => {
        if (response.data.count === 0) {
          dispatch(loginError('Username does not exist'));
          return;
        }

        for (const user of response.data.results) {
          if (user.birth_year === dob) {
            try {
              await AsyncStorage.setItem('username', username);
            } catch (e) {
              console.log(e);
            }

            dispatch(loginSuccess(username));
            dispatch(getPlanets());
            return;
          }
        }

        dispatch(loginError('Username does not exist'));
      })
      .catch(error => dispatch(loginError(error.message)));
  };

export const getPlanets = () =>
  dispatch => {
    dispatch(getPlanetsPending());
    getPlanetData().
      then(response => dispatch(getPlanetsSuccess(response.data.results)));
  }