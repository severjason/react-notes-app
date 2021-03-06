import React from 'react';
import { Note } from '../../components';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router';
import { AppNoteActions, NoteProps } from '../../interfaces';
import { HELMET_TITLE } from '../../../../constants';
import { AppModalActions } from '../../../modal/interfaces';

interface NoteActions {
  actions: AppNoteActions & AppModalActions;
}

const FullNote: React.FunctionComponent<NoteProps & NoteActions> =
  ({note, activeCategory, actions, userId}) => {
    return (note && userId === note.uid)
      ? (
        <div style={{paddingTop: '.5rem'}}>
          <Helmet title={`Full note - ${note.title} | ${HELMET_TITLE}`}/>
          <Note {...note} actions={actions} fullView={true} activeCategory={activeCategory}/>
        </div>
      )
      : <Redirect to={`/notes/${activeCategory ? activeCategory : 'all'}`}/>;
  };

export default FullNote;
