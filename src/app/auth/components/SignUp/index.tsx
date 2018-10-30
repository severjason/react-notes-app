import * as React from 'react';
import { reduxForm, InjectedFormProps, ConfigProps } from 'redux-form';
import { AppValidationProps } from '../../interfaces';
import { SIGNUP_FORM_NAME } from '../../../../constants';
import { AuthForm } from '../../../common/forms';
import RenderTextField from '../../../common/forms/RenderTextField';

const SignUp: React.StatelessComponent<InjectedFormProps> = (props) => {
  return (
    <AuthForm
      formTitle="Sign Up form"
      fields={[
        {
          type: 'text',
          name: 'username',
          component: RenderTextField,
          label: 'Username',
          required: true,
          inputProps: {
            maxLength: 30,
          }
        },
        {
          type: 'email',
          name: 'email',
          component: RenderTextField,
          label: 'Email',
          required: true,
          inputProps: {
            maxLength: 30
          }
        },
        {
          type: 'password',
          name: 'password',
          component: RenderTextField,
          label: 'Password',
          required: true,
          inputProps: {
            maxLength: 30,
          }
        },
        {
          type: 'password',
          name: 'passwordConfirmation',
          component: RenderTextField,
          label: 'Confirm password',
          required: true,
          inputProps: {
            maxLength: 30,
          }
        }
      ]}
      {...props}
    />
  );
};

export default reduxForm<ConfigProps<FormData> & AppValidationProps>({
  form: SIGNUP_FORM_NAME,
  // @ts-ignore
})(SignUp);
