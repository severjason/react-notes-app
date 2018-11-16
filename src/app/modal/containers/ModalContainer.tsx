import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import * as modalActions from '../redux/actions';
import * as notesActions from '../../note/redux/actions';
import {
  AppAction,
  AppCategories,
  AppModal,
  AppNotesState,
  AppTags,
  AppWithFirebaseAuthProps
} from '../../interfaces';
import { NoteModal } from '../components';
import { AppModalProps, AppModalPropsWithFirebase, AppModalActions, AppTagsActions } from '../interfaces';
import { AppNoteActions } from '../../note/interfaces';
import { filterCategories } from '../../../helpers';
import withFirebaseAuth from '../../hocs/withFirebaseAuth';

interface AppHomeDispatch {
  actions: AppTagsActions & AppModalActions & AppNoteActions;
}

class ModalContainer extends
  React.Component<AppModalPropsWithFirebase & AppWithFirebaseAuthProps & AppHomeDispatch, {}> {

  getNoteForUpdate = () => {
    const {notes, modal} = this.props;
    return modal.noteId !== null ? notes[modal.noteId] : null;
  }

  render() {
    const {modal, categories, actions, firebaseUser: {auth}} = this.props;
    return (
      <NoteModal
        userId={auth.uid}
        modal={modal}
        categories={categories}
        actions={actions}
        noteForUpdate={this.getNoteForUpdate()}
      />
    );
  }
}

export default compose(
  withFirebaseAuth,
  connect<AppModalProps, AppHomeDispatch>(
    ({categories, notes, modal}:
       { categories: AppCategories, notes: AppNotesState, modal: AppTags & AppModal }) => ({
      categories: {
        categoriesList: filterCategories(categories.categoriesList),
        activated: categories.activated,
        expanded: categories.expanded,
      },
      notes: notes.allNotes,
      modal,
    }),
    (dispatch: Dispatch<AppAction>) => ({
      actions: bindActionCreators({...notesActions, ...modalActions}, dispatch)
    })
  )
)(ModalContainer);
