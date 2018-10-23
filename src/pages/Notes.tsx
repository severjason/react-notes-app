import * as React from 'react';
import { withRouter, RouteComponentProps, /*Redirect*/ } from 'react-router';
import HomeContainer from '../app/Home/containers/HomeContainer';
import { BaseLayout } from '../app/layouts';

interface AppRoute {
  match: any;
}
const NotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = (props) => (
  <BaseLayout>
    <HomeContainer {...props}/>
  </BaseLayout>
);

export default withRouter(NotesPage);
