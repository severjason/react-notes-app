import * as React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter, RouteComponentProps } from 'react-router';
import { BaseLayout } from '../app/layouts';
import { AppRoute } from '../app/interfaces';
import LoginContainer from '../app/auth/containers/LoginContainer';
import { helmetTitle } from '../constants';

const FullNotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = () => (
  <BaseLayout>
    <Helmet title={`Login | ${helmetTitle}`} />
    <LoginContainer/>
  </BaseLayout>
);

export default withRouter(FullNotesPage);
