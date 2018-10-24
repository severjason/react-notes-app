import * as React from 'react';
import { Grid, FormGroup, TextField, Typography, IconButton } from '@material-ui/core';
import { Clear, Done } from '@material-ui/icons';
import LoginStyles from './styles';
import { reduxForm, InjectedFormProps, WrappedFieldProps, Field, ConfigProps } from 'redux-form';
import validate from './validation';
import { AppValidationProps, AppLoginProps } from '../../interfaces';

interface TextInputProps {
  label: string;
  className?: string;
}

const renderTextField: React.StatelessComponent<WrappedFieldProps & TextInputProps> =
  ({input, label, meta: {touched, error}, ...custom}: any) => (
      <TextField
        hinttext={label}
        label={label}
        helperText={(!!error && touched) && error}
        error={touched && !!error}
        {...input}
        {...custom}
      />
  );
const Login: React.StatelessComponent<InjectedFormProps & AppLoginProps> =
  ({ handleSubmit, pristine, reset, submitting}) => {
  return (
    <LoginStyles>
      <form onSubmit={handleSubmit}>
        <Grid container={true} alignItems="center" justify="center" direction="column" className="grid-container">
          <Typography variant="h5">
            Login form
          </Typography>
          <FormGroup className="form-group" >
            <Field type="email" name="email" component={renderTextField} label="Email" required={true}/>
            <Field type="password" name="password" component={renderTextField} label="Password" required={true}/>
            <Field
              type="password"
              name="passwordConfirmation"
              component={renderTextField}
              label="Confirm password"
              required={true}
            />
            <Grid container={true} alignItems="center" justify="center" className="grid-container">
              <IconButton type="button" disabled={pristine || submitting} onClick={reset}>
                <Clear/>
              </IconButton>
              <IconButton type="submit" disabled={pristine || submitting}>
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
  form: 'login',
  validate,
  // @ts-ignore
})(Login);
