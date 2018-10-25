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
  payload: {
    email: string;
    password: string;
  };
}
