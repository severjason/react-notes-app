export const email = (value: string) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email address'
  : undefined;

export const password = (value: string) => value && !/^[A-Z0-9_,-.+]*$/i.test(value)
  ? 'In password can be only english letters, digits and symbols(_-,.+)'
  : undefined;

export const required = (value: string | number) => (value || typeof value === 'number' ? undefined : 'Required');

export const createMinLengthValidator = (min: number) => (value: string) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength6 = createMinLengthValidator(6);

export const createIsFieldEqualValidator = (fieldNameToEqual: string | number, errorMessage?: string) => {
  if (!fieldNameToEqual) {
    throw new Error('createIsFieldEqualValidator validator required fieldNameToEqual');
  }
  return (value: string| number, allValues: any, props: any, name: string) =>
    allValues[fieldNameToEqual] && value === allValues[fieldNameToEqual]
      ? undefined
      : (errorMessage || `${fieldNameToEqual} not equal to ${name}`);
};

export const isEqualToPassword =
  createIsFieldEqualValidator('password', 'Passwords are not equal');
