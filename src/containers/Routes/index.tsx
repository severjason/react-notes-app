import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Home } from '../../containers';

const Routes: React.StatelessComponent<{}> = () => {
    return (
        <Switch>
            <Route path="/notes" component={Home}/>
            <Route exact={true} path="/" render={() => <Redirect to="/notes/all"/>}/>
            <Route path="*" render={() => <Redirect to="/notes/all"/>}/>
        </Switch>
    );
};

export default Routes;