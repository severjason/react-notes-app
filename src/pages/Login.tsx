import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { BaseLayout } from '../app/layouts';
import { AppRoute } from '../app/interfaces';
import LoginContainer from '../app/auth/containers/LoginContainer';

const FullNotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = () => (
  <BaseLayout>
    <LoginContainer/>
  </BaseLayout>
);

export default withRouter(FullNotesPage);
