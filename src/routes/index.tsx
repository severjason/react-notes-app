import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { NotFound } from '../app/common';
import { NotesPage, FullNotesPage, Login } from '../pages';
import PrivateRoute from '../routes/Private';

const Routes: React.StatelessComponent<{}> = () => {
  return (
    <Switch>
      <Route exact={true} path="/" render={() => <Redirect to="/notes/all"/>}/>
      <PrivateRoute exact={true} path="/notes/:category" component={NotesPage} />
      <Route exact={true} path="/login" component={Login}/>
      <PrivateRoute exact={true} path="/note/:noteId" component={FullNotesPage}/>
      <Route component={NotFound}/>
    </Switch>
  );
};

export default Routes;
