import * as React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter, RouteComponentProps } from 'react-router';
import { BaseLayout } from '../app/layouts';
import { AppRoute } from '../app/interfaces';
import { HELMET_TITLE } from '../constants';

const FullNotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = () => (
  <BaseLayout>
    <Helmet title={`Sign Up | ${HELMET_TITLE}`} />
    <div/>
  </BaseLayout>
);

export default withRouter(FullNotesPage);
