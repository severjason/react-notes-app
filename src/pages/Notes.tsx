import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import HomeContainer from '../app/home/containers/HomeContainer';

interface AppRoute {
  match: any;
}
const NotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = (props) => <HomeContainer {...props}/>;

export default withRouter(NotesPage);
