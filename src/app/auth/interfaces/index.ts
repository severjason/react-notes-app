export interface AppValidationProps {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

export interface AppLoginProps {
  firebaseError: null | object;
}
