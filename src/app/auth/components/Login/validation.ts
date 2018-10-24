import { AppValidationProps } from '../../interfaces';

const validate = (values: AppValidationProps): any => {
  const errors: AppValidationProps = {};
  const requiredFields = [
    'email',
    'password',
    'passwordConfirmation'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords are not equal';
  }
  return errors;
};

export default validate;
