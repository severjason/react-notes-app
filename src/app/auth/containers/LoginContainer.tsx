import * as React from 'react';
import { Login } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../redux/actions';

interface AppLoginContainerProps {
  firebase?: any;
  loginRequest: ({email, password}: {email: string, password: string}) => void;
}

class LoginContainer extends React.Component<AppLoginContainerProps> {

  render() {
    const { loginRequest } = this.props;
    return (
      <Login onSubmit={loginRequest}/>
    );
  }
}

export default connect(null, {loginRequest})(LoginContainer);
