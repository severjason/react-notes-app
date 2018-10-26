import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps, RouteComponentProps } from 'react-router';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import FullScreenLoading from '../app/common/loading/FullScreen';
import { connect } from 'react-redux';

interface UnPrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  auth?: any;
}
type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

class UnPrivateRoute extends Route<UnPrivateRouteProps> {
  render () {
    const {component: Component, auth, ...rest}: UnPrivateRouteProps = this.props;
    const renderComponent: RenderComponent = (props) => (
      !isLoaded(auth)
        ? <FullScreenLoading />
        : !isEmpty(auth)
        ? <Redirect to="/" />
        : <Component {...props} />
    );
    return (
      <Route {...rest} render={renderComponent} />
    );
  }
}

export default firebaseConnect()(
  connect(({ firebase: { auth } }: {firebase: any}) => ({ auth })
  )(UnPrivateRoute));
