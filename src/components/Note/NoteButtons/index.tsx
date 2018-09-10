import * as React from 'react';
import { AppNoteActions, AppNote } from '../../../interfaces/notes';
import { AppModalActions } from '../../../interfaces/modal';
import { Link } from 'react-router-dom';
import { DeleteForeverOutlined, EditOutlined, ZoomOutMapOutlined, ClearOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import NoteButtonStyles from './styles';
import { AlertDialog } from '../../../components';

interface AppNoteButtonsProps {
  note: AppNote;
  actions: AppNoteActions & AppModalActions;
  fullView?: boolean;
  activeCategory?: string;
}

interface AppNoteButtonsState {
  opened: boolean;
}

class NoteButtons extends React.Component<AppNoteButtonsProps, AppNoteButtonsState> {

  state = {
    opened: false,
  };

  openDialog = () => this.setState(() => ({opened: true}));

  closeDialog = () => this.setState(() => ({opened: false}));

  render() {
    const {actions, note, fullView, activeCategory} = this.props;
    const {opened} = this.state;
    return (
      <NoteButtonStyles>
        <AlertDialog
          title={`Are you sure? `}
          onClose={this.closeDialog}
          onConfirm={() => actions.deleteNote(note.id)}
          opened={opened}
        />
        <IconButton  onClick={() => actions.openModalForUpdate(note)} className="note-button">
          <EditOutlined className="note-button app-note-edit-icon"/>
        </IconButton>
        <IconButton onClick={this.openDialog} className="note-button">
          <DeleteForeverOutlined className="app-note-delete-icon"/>
        </IconButton>
        {(!fullView)
          ? <Link to={`/note/${note.id}`}>
            <IconButton title="Expand note" className="note-button">
              <ZoomOutMapOutlined className="app-note-expand-icon"/>
            </IconButton>
          </Link>
          : <Link to={`/notes/${activeCategory}`}>
            <IconButton title="Close note" className="note-button">
              <ClearOutlined className="app-note-close-icon"/>
            </IconButton>
          </Link>
        }
      </NoteButtonStyles>
    );
  }
}

export default NoteButtons;
