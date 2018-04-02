import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Home } from '../../containers';

const Routes: React.StatelessComponent<{}> = () => {
    return (
        <Switch>
            <Route path="/notes" component={Home}/>
            <Route exact={true} path="/" render={() => <Redirect to="/notes"/>}/>
            <Route path="*" render={() => <Redirect to="/notes"/>}/>
        </Switch>
    );
};

export default Routes;