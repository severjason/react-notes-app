import * as React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

function withFirebaseAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  class Wrapper extends React.Component {
    public render() {
      return <WrappedComponent {...this.props}/>;
    }
  }

  return firebaseConnect()(
    connect(({ firebase: { auth } }: {firebase: any}) => ({ auth })
    )(Wrapper));
}

export default withFirebaseAuth;
