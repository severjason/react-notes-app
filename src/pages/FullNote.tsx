import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppRoute } from '../app/interfaces';
// @ts-ignore
import { lazy } from 'react';

const NoteContainer = lazy(() => import('../app/note/containers/NoteContainer'));

const FullNotesPage: React.StatelessComponent<RouteComponentProps<AppRoute>> = (props) => <NoteContainer {...props}/>;

export default withRouter(FullNotesPage);
