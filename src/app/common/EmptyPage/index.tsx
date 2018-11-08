import * as React from 'react';
import EmptyPageStyles from './styles';
import Paper from '@material-ui/core/Paper';

interface AppEmptyPage {
  category?: string;
}

const EmptyPage: React.StatelessComponent<AppEmptyPage> = (props: AppEmptyPage) => {
  const {category} = props;
  return (
    <EmptyPageStyles>
      <Paper className="page-message-container">
        {(category === 'all') ? `No notes...` : `No notes in this category...`}
      </Paper>
    </EmptyPageStyles>
  );
};

export default EmptyPage;
