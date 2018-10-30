import { AppAction } from '../../interfaces';

export interface AppValidationProps {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

export interface AppAuthAction extends AppAction {
  payload?: {
    username?: string;
    email: string;
    password: string;
  };
}
export interface AppLoginActions {
  logoutRequest?: () =>  AppAuthAction;
  loginRequest?: ({email, password}: {email: string, password: string}) =>  AppAuthAction;
}
