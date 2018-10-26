import * as React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';

interface WrappedComponentProps {
  auth: any;
  isLoaded: boolean;
  isEmpty: boolean;
}

function withFirebaseAuth<P extends object>(WrappedComponent: React.ComponentType<P & WrappedComponentProps> ) {
  class Wrapper extends React.Component<WrappedComponentProps> {
    public render() {
      const { auth } = this.props;
      return <WrappedComponent isLoaded={isLoaded(auth)} isEmpty={isEmpty(auth)} {...this.props}/>;
    }
  }

  return firebaseConnect()(
    connect(({ firebase: { auth } }: {firebase: any}) => ({ auth })
    )(Wrapper));
}

export default withFirebaseAuth;
