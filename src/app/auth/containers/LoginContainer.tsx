import * as React from 'react';
import { Login } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../redux/actions';

interface AppLoginContainerProps {
  firebase?: any;
  authError?: null | object;
  loginRequest: ({email, password}: {email: string, password: string}) => void;
}

class LoginContainer extends React.Component<AppLoginContainerProps> {

  render() {
    const { authError, loginRequest } = this.props;
    return (
      <Login onSubmit={loginRequest} firebaseError={authError}/>
    );
  }
}

const mapStateToProps = (state: any) => ({
  authError: state.firebase.authError,
});

export default connect(mapStateToProps, {loginRequest})(LoginContainer);
