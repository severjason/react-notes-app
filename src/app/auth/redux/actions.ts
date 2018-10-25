import * as types from './types';
import { AppLoginAction } from '../interfaces';

export const loginRequest = ({email, password}: {email: string, password: string}): AppLoginAction => ({
  type: types.USER_LOGIN_REQUEST,
  payload: {
    email,
    password,
  }
});
