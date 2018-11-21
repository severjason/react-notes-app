import * as React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error.message };
  }
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  render() {
    const {hasError, error} = this.state;
    if (hasError) {
      return (
        <div style={{textAlign: 'center'}}>
          <h2 >Something went wrong.</h2>
          <p>Error: {error}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
