import * as React from 'react';
import { AppNoteActions } from '../../../interfaces';
import { AppModalActions } from '../../../../interfaces';
import { Link } from 'react-router-dom';
import DeleteForeverOutlined from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import ZoomOutMapOutlined from '@material-ui/icons/ZoomOutMapOutlined';
import ClearOutlined from '@material-ui/icons/ClearOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import NoteButtonStyles from './styles';
import { AlertDialog } from '../../../../common';

interface AppNoteButtonsProps {
  noteId: any;
  actions: AppNoteActions & AppModalActions;
  fullView?: boolean;
  activeCategory?: string;
}

interface AppNoteButtonsState {
  opened: boolean;
}

class NoteButtons extends React.PureComponent<AppNoteButtonsProps, AppNoteButtonsState> {

  state = {
    opened: false,
  };

  openDialog = () => this.setState(() => ({opened: true}));

  closeDialog = () => this.setState(() => ({opened: false}));

  render() {
    const {actions, noteId, fullView, activeCategory} = this.props;
    const {opened} = this.state;
    return (
      <NoteButtonStyles>
        <AlertDialog
          title={`Are you sure? `}
          onClose={this.closeDialog}
          onConfirm={() => actions.deleteNote(noteId)}
          opened={opened}
        />
        <Tooltip title={`Edit note`}>
          <IconButton onClick={() => actions.openModalForUpdate(noteId)} className="note-button">
            <EditOutlined className="note-icon app-note-edit-icon"/>
          </IconButton>
        </Tooltip>
        <Tooltip title={`Delete note`}>
          <IconButton onClick={this.openDialog} className="note-button">
            <DeleteForeverOutlined className="note-icon app-note-delete-icon"/>
          </IconButton>
        </Tooltip>
        {(!fullView)
          ? <Link to={`/note/${noteId}`}>
            <Tooltip title={`Show more`}>
              <IconButton className="note-button">
                <ZoomOutMapOutlined className="note-icon app-note-expand-icon"/>
              </IconButton>
            </Tooltip>
          </Link>
          : <Link to={`/notes/${activeCategory}`}>
            <Tooltip title={`Close note`}>
              <IconButton className="note-button">
                <ClearOutlined className="note-icon app-note-close-icon"/>
              </IconButton>
            </Tooltip>
          </Link>
        }
      </NoteButtonStyles>
    );
  }
}

export default NoteButtons;
