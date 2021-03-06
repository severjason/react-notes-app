import * as React from 'react';
import { firebaseAuthContext as Context } from '../context';

interface WrappedComponentProps {
  auth: any;
  profile: any;
  isAuthReady: boolean;
  isAuthEmpty: boolean;
}

function withFirebaseAuth<P extends object>(WrappedComponent: React.ComponentType<P & any> ) {
  return class Wrapper extends React.Component<any> {
    public render() {
      return (
        <Context.Consumer>
          {({auth, isAuthReady, isAuthEmpty, profile}: WrappedComponentProps) => (
            <WrappedComponent firebaseUser={{auth, profile, isAuthEmpty, isAuthReady}} {...this.props}/>
          )}
        </Context.Consumer>
      );
    }
  };
}

export default withFirebaseAuth;
