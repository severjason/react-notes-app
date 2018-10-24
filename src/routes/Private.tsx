import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps, RouteComponentProps } from 'react-router';
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  firebase?: any;
}
type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

class PrivateRoute extends Route<PrivateRouteProps> {
  render () {
    const {component: Component, firebase, ...rest}: PrivateRouteProps = this.props;
    const {auth} = firebase;
    const renderComponent: RenderComponent = (props) => (
      !isLoaded(auth)
        ? <span>Loading...</span>
        : isEmpty(auth)
        ? <Redirect to="/login" />
        : <Component {...props} />
    );

    return (
      <Route {...rest} render={renderComponent} />
    );
  }
}

export default withFirebase(PrivateRoute);
