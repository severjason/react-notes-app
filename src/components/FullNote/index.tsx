import * as React from 'react';
import { Note } from '../../components';
import { AppNote, NoteProps, AppRoute, AppAllActions } from '../../interfaces';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router';

interface NoteActions {
  actions: AppAllActions;
}

const FullNote: React.StatelessComponent<NoteProps & AppRoute & NoteActions> =
  ({notes, match, activeCategory, actions}) => {
    const noteIndex = (): number => {
      return notes.findIndex((note: AppNote) => match.params.noteId === note.id);
    };
    const requestedNote = notes[noteIndex()];
    return (noteIndex() !== -1) ? (
        <React.Fragment>
          <Helmet title={`Full note - ${requestedNote.title}`}/>
          <Note note={requestedNote} actions={actions} fullView={true} activeCategory={activeCategory}/>
        </React.Fragment>
      )
      : <Redirect to={`/notes/${activeCategory}`}/>;
  };

export default FullNote;
