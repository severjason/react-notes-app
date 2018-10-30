import * as React from 'react';
import { reduxForm, InjectedFormProps, ConfigProps } from 'redux-form';
import { AppValidationProps } from '../../interfaces';
import { LOGIN_FORM_NAME } from '../../../../constants';
import { AuthForm } from '../../../common/forms';
import { RenderTextField } from '../../../common/forms';

const Login: React.StatelessComponent<InjectedFormProps> = (props) => {
  return (
    <AuthForm
      formTitle="Login form"
      fields={[
        {
          type: 'email',
          name: 'email',
          component: RenderTextField,
          label: 'Email',
          required: true,
        },
        {
          type: 'password',
          name: 'password',
          component: RenderTextField,
          label: 'Password',
          required: true,
        }
      ]}
      {...props}
    />
  );
};

export default reduxForm<ConfigProps<FormData> & AppValidationProps>({
  form: LOGIN_FORM_NAME,
  // @ts-ignore
})(Login);
