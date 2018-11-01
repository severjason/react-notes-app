import * as React from 'react';
import { connect } from 'react-redux';
import { googleAuthRequest, githubAuthRequest } from '../redux/actions';
import { AppAuthProps } from '../interfaces';
import { SocialLogin } from '../components';

const SocialContainer: React.StatelessComponent<AppAuthProps> = (props) => <SocialLogin {...props}/>;

export default connect(
  null,
  {googleAuthRequest, githubAuthRequest})(SocialContainer);
