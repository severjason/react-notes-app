import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { NotFound } from '../components';
import { NotesPage, FullNotesPage } from '../pages';

const Routes: React.StatelessComponent<{}> = () => {
  return (
    <Switch>
      <Route exact={true} path="/" render={() => <Redirect to="/notes/all"/>}/>
      <Route exact={true} path="/notes/:category" component={NotesPage}/>
      <Route exact={true} path="/note/:noteId" component={FullNotesPage}/>
      <Route component={NotFound}/>
    </Switch>
  );
};

export default Routes;