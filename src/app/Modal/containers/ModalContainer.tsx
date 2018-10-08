import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../../actions';
import { AppAction, AppAllActions, AppState, AppModalProps } from '../../interfaces';
import { NoteModal } from '../components';

interface AppHomeDispatch {
  actions: AppAllActions;
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
    tags: state.tags,
    notes: state.notes.byId,
    modal: state.modal,
  }),
  (dispatch: Dispatch<AppAction>) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(ModalContainer);
