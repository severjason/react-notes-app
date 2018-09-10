import * as React from 'react';
import { withRouter, RouteComponentProps, /*Redirect*/ } from 'react-router';
import HomeContainer from '../containers/HomeContainer';
/*import { Helmet } from "react-helmet";
import NotesList from "../components/NotesList";*/

interface AppRoute {
  match: any;
}
const NotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = (props) => <HomeContainer {...props}/>;

export default withRouter(NotesPage);

{
  /*(categories.categoriesList.includes(category))
    ? <React.Fragment>
      <Helmet title={`${category[0].toUpperCase() + category.substring(1)} | Notes`} />
      <NotesList {...props} routeCategory={category}/>
    </React.Fragment>
    : <Redirect to="/notes/all"/>*/
}