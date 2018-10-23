import * as React from 'react';
import { Grid, FormControl, InputLabel, Input } from '@material-ui/core';
import LoginStyles from './styles';

const Login: React.StatelessComponent<{}> = () => {
  return (
    <LoginStyles>
      <Grid container={true} alignItems="center" justify="center">
        <FormControl >
          <InputLabel
            htmlFor="component-outlined"
          >
            E-mail
          </InputLabel>
          <Input
            required={true}
            type="email"
            id="component-outlined"
          />
        </FormControl>
      </Grid>
    </LoginStyles>
  );
};

export default Login;
