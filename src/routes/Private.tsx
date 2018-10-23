import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps, RouteComponentProps } from 'react-router';
import { withFirebase, isLoaded } from 'react-redux-firebase';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  auth?: any;
}
type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

class PrivateRoute extends Route<PrivateRouteProps> {
  render () {
    const {component: Component, auth, ...rest}: PrivateRouteProps = this.props;
    const renderComponent: RenderComponent = (props) => (
      isLoaded(auth)
        ? <Component {...props} />
        : <Redirect to="/login" />
    );

    return (
      <Route {...rest} render={renderComponent} />
    );
  }
}

export default withFirebase(PrivateRoute);
