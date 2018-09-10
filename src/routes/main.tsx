import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
// import { HomeContainer } from '../containers';
import NotesPage from '../pages/Notes';

const MainRoutes: React.StatelessComponent<{}> = () => {
  return (
    <Switch>
      <Route exact={true} path="/" render={() => <Redirect to="/notes/all"/>}/>
      <Route exact={true} path="/notes/all" component={NotesPage}/>
    </Switch>
  );
};

export default MainRoutes;