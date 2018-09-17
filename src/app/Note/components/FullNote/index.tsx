import * as React from 'react';
import { Note } from '../../components';
import { NoteProps, AppRoute, AppAllActions } from '../../../interfaces';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router';

interface NoteActions {
  actions: AppAllActions;
}

const FullNote: React.StatelessComponent<NoteProps & AppRoute & NoteActions> =
  ({notes, match, activeCategory, actions}) => {
    const requestedNote = notes[match.params.noteId];
    return (requestedNote) ? (
        <React.Fragment>
          <Helmet title={`Full note - ${requestedNote.title}`}/>
          <Note note={requestedNote} actions={actions} fullView={true} activeCategory={activeCategory}/>
        </React.Fragment>
      )
      : <Redirect to={`/notes/${activeCategory}`}/>;
  };

export default FullNote;
