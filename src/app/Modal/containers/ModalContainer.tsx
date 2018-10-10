import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as modalActions from '../redux/actions';
import * as notesActions from '../../Note/redux/actions';
import { AppAction, AppState } from '../../interfaces';
import { NoteModal } from '../components';
import { AppModalProps, AppModalActions, AppTagsActions } from '../interfaces';
import { AppNoteActions } from '../../Note/interfaces';

interface AppHomeDispatch {
  actions: AppTagsActions & AppModalActions & AppNoteActions;
}

class ModalContainer extends React.Component<AppModalProps & AppHomeDispatch, {}> {

  getNoteForUpdate = () => {
    const {notes, modal} = this.props;
    return modal.noteId !== null ? notes[modal.noteId] : null;
  }

  render() {
    return (
      <NoteModal {...this.props} noteForUpdate={this.getNoteForUpdate()}/>
    );
  }
}

export default connect<AppModalProps, AppHomeDispatch>(
  (state: AppState) => ({
    categories: state.categories,
    notes: state.notes.byId,
    modal: state.modal,
  }),
  (dispatch: Dispatch<AppAction>) => ({
    actions: bindActionCreators({...notesActions, ...modalActions}, dispatch)
  })
)(ModalContainer);
