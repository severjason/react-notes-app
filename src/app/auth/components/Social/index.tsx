import * as React from 'react';
import { AppAuthProps } from '../../interfaces';
import { Button, Typography, Divider } from '@material-ui/core';

const SocialLogin: React.StatelessComponent<AppAuthProps> = ({googleAuthRequest, githubAuthRequest}) => (
  <React.Fragment>
    <Typography variant="subtitle1">
      Login with social services
    </Typography>
    <Button onClick={googleAuthRequest} variant="contained" color="secondary">
      Login with Google
    </Button>
    <Divider inset={true}/>
    <Button onClick={githubAuthRequest} variant="contained">
      Login with Github
    </Button>
  </React.Fragment>
);

export default SocialLogin;
