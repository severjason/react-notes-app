import * as React from 'react';
import { AppAuthProps } from '../../interfaces';
import { Button, Typography } from '@material-ui/core';
import SocialLoginStyles from './styles';

const SocialLogin: React.StatelessComponent<AppAuthProps> = ({googleAuthRequest, githubAuthRequest}) => (
  <SocialLoginStyles>
    <Typography variant="subtitle1" className="title">
      Login with social services
    </Typography>
    <div className="buttons-container">
      <Button onClick={googleAuthRequest} variant="contained">
        Login with Google
      </Button>
      <Button onClick={githubAuthRequest} variant="contained">
        Login with Github
      </Button>
    </div>
  </SocialLoginStyles>
);

export default SocialLogin;
