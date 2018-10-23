import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import NoteContainer from '../app/note/containers/NoteContainer';
import { BaseLayout } from '../app/layouts';
import { AppRoute } from '../app/interfaces';

const FullNotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = (props) => (
  <BaseLayout>
    <NoteContainer {...props}/>
  </BaseLayout>
);

export default withRouter(FullNotesPage);
