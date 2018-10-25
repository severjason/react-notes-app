import * as React from 'react';
import { Grid, FormGroup, Typography, IconButton } from '@material-ui/core';
import { Clear, Done } from '@material-ui/icons';
import LoginStyles from './styles';
import { reduxForm, InjectedFormProps, Field, ConfigProps } from 'redux-form';
import validate from './validation';
import { AppValidationProps, AppLoginProps } from '../../interfaces';
import { loginForm } from '../../../../constants';
import { RenderTextField } from '../../../common/forms';

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
            <Field type="email" name="email" component={RenderTextField} label="Email" required={true}/>
            <Field type="password" name="password" component={RenderTextField} label="Password" required={true}/>
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
  form: loginForm,
  validate,
  // @ts-ignore
})(Login);
