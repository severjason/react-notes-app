import * as React from 'react';
import { firebaseAuthContext as Context } from '../context';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
// @ts-ignore
import isEqual from 'lodash/fp/isEqual';

interface AppFirebaseAuthProvider {
  auth: any;
  profile: any;
}

class FirebaseAuthProvider extends React.Component<AppFirebaseAuthProvider> {

  static getDerivedStateFromProps(nextProps: AppFirebaseAuthProvider, prevState: any) {
    if (!isEqual(nextProps.profile, prevState.profile) || !isEqual(nextProps.auth, prevState.auth)) {
      return {
        auth: nextProps.auth,
        isAuthEmpty: isEmpty(nextProps.auth),
        isAuthReady: isLoaded(nextProps.auth),
        profile: nextProps.profile,
      };
    }
    return null;
  }

  constructor(props: AppFirebaseAuthProvider) {
    super(props);
    this.state = {
      auth: this.props.auth,
      isAuthEmpty: isEmpty(this.props.auth),
      isAuthReady: isLoaded(this.props.auth),
      profile: this.props.profile
    };
  }

  public render () {
    return (
      <Context.Provider
        value={this.state}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default firebaseConnect()(
  connect(({firebase: {auth, profile}}: { firebase: any }) => ({auth, profile})
  )(FirebaseAuthProvider));
