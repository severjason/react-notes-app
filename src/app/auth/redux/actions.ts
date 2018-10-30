import * as types from './types';
import { AppAuthAction } from '../interfaces';

export const loginRequest = ({email, password}: {email: string, password: string}): AppAuthAction => ({
  type: types.USER_LOGIN_REQUEST,
  payload: {
    email,
    password,
  }
});

export const signupRequest =
  ({username, email, password}: {username: string, email: string, password: string}): AppAuthAction => ({
  type: types.USER_SIGNUP_REQUEST,
  payload: {
    username,
    email,
    password,
  }
});

export const logoutRequest = (): AppAuthAction => ({
  type: types.USER_LOGOUT_REQUEST,
});
