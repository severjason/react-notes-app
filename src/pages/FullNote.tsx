import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import NoteContainer from '../app/note/containers/NoteContainer';
import { AppRoute } from '../app/interfaces';

const FullNotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = (props) => <NoteContainer {...props}/>;

export default withRouter(FullNotesPage);
