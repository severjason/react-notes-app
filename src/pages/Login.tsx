import * as React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppRoute } from '../app/interfaces';
import LoginContainer from '../app/auth/containers/LoginContainer';
import { HELMET_TITLE } from '../constants';

const FullNotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = () => (
  <React.Fragment>
    <Helmet title={`Login | ${HELMET_TITLE}`} />
    <LoginContainer/>
  </React.Fragment>
);

export default withRouter(FullNotesPage);
