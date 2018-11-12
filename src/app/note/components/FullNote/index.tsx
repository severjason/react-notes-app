import * as React from 'react';
import { Note } from '../../components';
import { AppModalActions } from '../../../interfaces';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router';
import { AppNoteActions, NoteProps } from '../../interfaces';
import { HELMET_TITLE } from '../../../../constants';

interface NoteActions {
  actions: AppNoteActions & AppModalActions;
}

const FullNote: React.StatelessComponent<NoteProps & NoteActions> =
  ({note, activeCategory, actions}) => {
    const requestedNote = note[0];
    return (requestedNote)
      ? (
      <div style={{paddingTop: '.5rem'}}>
        <Helmet title={`Full note - ${requestedNote.title} | ${HELMET_TITLE}`}/>
        <Note {...requestedNote} actions={actions} fullView={true} activeCategory={activeCategory}/>
      </div>
      )
      : <Redirect to={`/notes/${activeCategory}`}/>;
  };

export default FullNote;
