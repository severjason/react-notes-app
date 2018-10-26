import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps, RouteComponentProps } from 'react-router';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import FullScreenLoading from '../app/common/loading/FullScreen';
import { withFirebaseAuth } from '../app/hocs';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  auth?: any;
}
type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

class PrivateRoute extends Route<PrivateRouteProps> {
  render () {
    const {component: Component, auth, ...rest}: PrivateRouteProps = this.props;
    const renderComponent: RenderComponent = (props) => (
      !isLoaded(auth)
        ? <FullScreenLoading />
        : isEmpty(auth)
        ? <Redirect to="/login" />
        : <Component {...props} />
    );

    return (
      <Route {...rest} render={renderComponent} />
    );
  }
}
export default withFirebaseAuth(PrivateRoute);
