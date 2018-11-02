import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { NotFound } from '../app/common';
import { NotesPage, Login, SignUp, FullNote } from '../pages';
import PrivateRoute from '../routes/Private';
import UnPrivate from '../routes/UnPrivate';
import { BaseLayout } from '../app/layouts';
import FullScreenLoading from '../app/common/loading/FullScreen';
// @ts-ignore
import { Suspense } from 'react';

const Routes: React.StatelessComponent<{}> = () => {
  return (
    <BaseLayout>
      <Suspense fallback={<FullScreenLoading />}>
        <Switch>
          <Route exact={true} path="/" render={() => <Redirect to="/notes/all"/>}/>
          <PrivateRoute exact={true} path="/notes/:category" component={NotesPage} />
          <UnPrivate exact={true} path="/login" component={Login}/>
          <UnPrivate exact={true} path="/signup" component={SignUp}/>
          <PrivateRoute exact={true} path="/note/:noteId" component={FullNote} />
          <Route component={NotFound}/>
        </Switch>
      </Suspense>
    </BaseLayout>
  );
};

export default Routes;
