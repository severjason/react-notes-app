import * as React from 'react';
import { Grid, FormGroup, Typography, IconButton } from '@material-ui/core';
import { Clear, Done } from '@material-ui/icons';
import LoginStyles from './styles';
import { reduxForm, InjectedFormProps, Field, ConfigProps } from 'redux-form';
import { AppValidationProps, AppLoginProps } from '../../interfaces';
import { LOGIN_FORM_NAME } from '../../../../constants';
import { RenderTextField } from '../../../common/forms';
import { email, required } from '../../../common/forms/validators';

const Login: React.StatelessComponent<InjectedFormProps & AppLoginProps> =
  ({ handleSubmit, pristine, reset, submitting, invalid, error}) => {
  return (
    <LoginStyles>
      <form onSubmit={handleSubmit}>
        <Grid container={true} alignItems="center" justify="center" direction="column" className="grid-container">
          <Typography variant="h5">
            Login form
          </Typography>
          <FormGroup className="form-group" >
            <Field
              type="email"
              name="email"
              component={RenderTextField}
              label="Email"
              required={true}
              validate={[required, email]}
            />
            <Field
              type="password"
              name="password"
              component={RenderTextField}
              label="Password"
              required={true}
              validate={[required]}
            />
            {error && <p className="api-error">{error}</p>}
            <Grid container={true} alignItems="center" justify="space-evenly" className="grid-container">
              <IconButton type="button" disabled={pristine || submitting} onClick={reset}>
                <Clear/>
              </IconButton>
              <IconButton type="submit" disabled={pristine || submitting || invalid}>
                <Done/>
              </IconButton>
            </Grid>
          </FormGroup>
        </Grid>
      </form>
    </LoginStyles>
  );
};

export default reduxForm<ConfigProps<FormData> & AppValidationProps & AppLoginProps>({
  form: LOGIN_FORM_NAME,
  // @ts-ignore
})(Login);
