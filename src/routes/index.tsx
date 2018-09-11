import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
// import { HomeContainer } from '../containers';
import { NotFound } from '../components';
import NotesPage from '../pages/Notes';

const Routes: React.StatelessComponent<{}> = () => {
  return (
    <Switch>
      <Route exact={true} path="/" render={() => <Redirect to="/notes/all"/>}/>
      <Route exact={true} path="/notes/:category" component={NotesPage}/>
      <Route component={NotFound}/>
    </Switch>
  );
};

export default Routes;