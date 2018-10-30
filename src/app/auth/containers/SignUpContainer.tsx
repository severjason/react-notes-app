import * as React from 'react';
import { SignUp } from '../components';
import { connect } from 'react-redux';
import { signupRequest } from '../redux/actions';

interface AppLoginContainerProps {
  signupRequest: ({username, email, password}: {username: string; email: string, password: string}) => void;
}

class SignUpContainer extends React.Component<AppLoginContainerProps> {

  render() {
    const { signupRequest } = this.props;
    return (
      <SignUp onSubmit={signupRequest}/>
    );
  }
}

export default connect(null, {signupRequest})(SignUpContainer);
