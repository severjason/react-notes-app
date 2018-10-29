import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import FullScreenLoading from '../app/common/loading/FullScreen';
import { withFirebaseAuth } from '../app/hocs';
import { AppWithFirebaseAuthProps } from '../app/interfaces';

type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

class PrivateRoute extends Route<AppWithFirebaseAuthProps> {
  render () {
    const {component: Component, isEmpty, isLoaded, ...rest}: AppWithFirebaseAuthProps = this.props;
    const renderComponent: RenderComponent = (props) => (
      !isLoaded
        ? <FullScreenLoading/>
        : isEmpty
          ? <Redirect to="/login"/>
          : <Component {...props} />
    );

    return (
      <Route {...rest} render={renderComponent} />
    );
  }
}
export default withFirebaseAuth(PrivateRoute);
