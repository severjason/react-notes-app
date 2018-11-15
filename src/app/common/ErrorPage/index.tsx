import * as React from 'react';
import ErrorPageStyles from './styles';
import Paper from '@material-ui/core/Paper';

interface ErrorPageProps {
  error?: any;
}

const ErrorPage: React.FunctionComponent<ErrorPageProps> = (props: ErrorPageProps) => {
  const {error} = props;
  return (
    <ErrorPageStyles>
      <Paper className="page-message-container">
        {(error)
          ? <React.Fragment>
            <strong>Something happened:&nbsp;</strong>
            {error.name && `${error.name};`}
            {error.code ? ` code - ${error.code}.` : ''}
          </React.Fragment>
          : `Unknown error happened`}
      </Paper>
    </ErrorPageStyles>
  );
};

export default ErrorPage;
