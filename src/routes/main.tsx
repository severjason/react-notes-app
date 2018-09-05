import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { HomeContainer } from '../containers';

const MainRoutes: React.StatelessComponent<{}> = () => {
    return (
        <Switch>
            <Route path="/" component={HomeContainer}/>
            <Route exact={true} path="/" render={() => <Redirect to="/notes/all"/>}/>
        </Switch>
    );
};

export default MainRoutes;