import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { NotFound } from '../app/common';
import { NotesPage, FullNotesPage, Login, SignUp } from '../pages';
import PrivateRoute from '../routes/Private';
import UnPrivate from '../routes/UnPrivate';

const Routes: React.StatelessComponent<{}> = () => {
  return (
    <Switch>
      <Route exact={true} path="/" render={() => <Redirect to="/notes/all"/>}/>
      <PrivateRoute exact={true} path="/notes/:category" component={NotesPage} />
      <UnPrivate exact={true} path="/login" component={Login}/>
      <UnPrivate exact={true} path="/signup" component={SignUp}/>
      <PrivateRoute exact={true} path="/note/:noteId" component={FullNotesPage}/>
      <Route component={NotFound}/>
    </Switch>
  );
};

export default Routes;
