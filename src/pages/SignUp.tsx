import * as React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter, RouteComponentProps } from 'react-router';
import { BaseLayout } from '../app/layouts';
import { AppRoute } from '../app/interfaces';
import { HELMET_TITLE } from '../constants';
import SignUpContainer from '../../src/app/auth/containers/SignUpContainer';

const FullNotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = () => (
  <BaseLayout>
    <Helmet title={`Sign Up | ${HELMET_TITLE}`} />
    <SignUpContainer/>
  </BaseLayout>
);

export default withRouter(FullNotesPage);
