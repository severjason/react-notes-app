import * as React from 'react';
import { AppNoteActions, AppNote } from '../../../interfaces/notes';
import { AppModalActions } from '../../../interfaces/modal';
import { Link } from 'react-router-dom';
import { DeleteForeverOutlined, EditOutlined, ZoomOutMapOutlined, ClearOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

interface AppNoteButtonsProps {
  note: AppNote;
  actions: AppNoteActions & AppModalActions;
  fullView?: boolean;
  activeCategory?: string;
}

const NoteButtons: React.StatelessComponent<AppNoteButtonsProps> = ({actions, note, fullView, activeCategory}) => {

  return (
    <React.Fragment>
      <IconButton className="app-note-icon app-note-edit-icon" onClick={() => actions.openModalForUpdate(note)}>
        <EditOutlined/>
      </IconButton>
      <IconButton onClick={() => actions.deleteNote(note.id)} className="app-note-icon app-note-trash-icon">
        <DeleteForeverOutlined/>
      </IconButton>
      {(!fullView)
        ? <Link to={`/note/${note.id}`}>
          <IconButton className="app-note-icon app-note-expand-icon" title="Expand note">
            <ZoomOutMapOutlined/>
          </IconButton>
        </Link>
        : <Link to={`/notes/${activeCategory}`}>
          <IconButton className="app-note-icon app-note-close-icon" title="Close note">
            <ClearOutlined/>
          </IconButton>
        </Link>
      }
    </React.Fragment>
  );
};

export default NoteButtons;
