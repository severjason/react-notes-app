import * as React from 'react';
import { withRouter, RouteComponentProps, /*Redirect*/ } from 'react-router';
import HomeContainer from '../containers/HomeContainer';
import { BaseLayout } from '../layouts';

interface AppRoute {
  match: any;
}
const NotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = (props) => (
  <BaseLayout>
    <HomeContainer {...props}/>
  </BaseLayout>
);

export default withRouter(NotesPage);
