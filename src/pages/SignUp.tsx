import * as React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppRoute } from '../app/interfaces';
import { HELMET_TITLE } from '../constants';
// @ts-ignore
import { lazy } from 'react';

const SignUpContainer = lazy(() => import('../../src/app/auth/containers/SignUpContainer'));

const FullNotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = () => (
  <React.Fragment>
    <Helmet title={`Sign Up | ${HELMET_TITLE}`} />
    <SignUpContainer/>
  </React.Fragment>
);

export default withRouter(FullNotesPage);
