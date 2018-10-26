import { AppAction } from '../../interfaces';

export interface AppValidationProps {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

export interface AppLoginProps {
  firebaseError: null | object;
}

export interface AppLoginAction extends AppAction {
  payload?: {
    email: string;
    password: string;
  };
}
export interface AppLoginActions {
  logoutRequest?: () =>  AppLoginAction;
  loginRequest?: ({email, password}: {email: string, password: string}) =>  AppLoginAction;
}
