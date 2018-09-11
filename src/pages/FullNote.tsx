import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { NoteContainer } from '../containers';
import { BaseLayout } from '../layouts';
import { AppRoute } from '../interfaces';

const FullNotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = (props) => (
  <BaseLayout>
    <NoteContainer {...props}/>
  </BaseLayout>
);

export default withRouter(FullNotesPage);
