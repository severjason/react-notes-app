import * as React from 'react';
import { Login } from '../components';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

interface AppLoginContainerProps {
  firebase?: any;
  authError?: null | object;
}

class LoginContainer extends React.Component<AppLoginContainerProps> {

  private firebaseLogin = (values: any): void => {
    const { firebase } = this.props;
    const {email, password} = values;
    firebase.login({email, password})
      .catch((err: any) => console.log(2, err));
  }

  render() {
    const { authError } = this.props;
    return (
      <Login onSubmit={this.firebaseLogin} firebaseError={authError}/>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect((state: any) => ({
    authError: state.firebase.authError
  }))
)(LoginContainer);
