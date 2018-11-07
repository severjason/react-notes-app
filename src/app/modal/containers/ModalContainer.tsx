import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as modalActions from '../redux/actions';
import * as notesActions from '../../note/redux/actions';
import { AppAction, AppCategories, AppModal, AppTags } from '../../interfaces';
import { NoteModal } from '../components';
import { AppModalProps, AppModalActions, AppTagsActions } from '../interfaces';
import { AppNoteActions } from '../../note/interfaces';
import { filterCategories } from '../../../helpers';

interface AppHomeDispatch {
  actions: AppTagsActions & AppModalActions & AppNoteActions;
}

class ModalContainer extends React.Component<AppModalProps & AppHomeDispatch, {}> {

  getNoteForUpdate = () => {
    const {notes, modal} = this.props;
    return modal.noteId !== null ? notes[modal.noteId] : null;
  }

  render() {
    const {modal, categories, actions} = this.props;
    return (
      <NoteModal modal={modal} categories={categories} actions={actions} noteForUpdate={this.getNoteForUpdate()}/>
    );
  }
}

export default connect<AppModalProps, AppHomeDispatch>(
  ({firestore: {ordered}, categories, notes, modal}:
     { firestore: any, categories: AppCategories, notes: any, modal: AppTags & AppModal }) => ({
    categories: {
      categoriesList: filterCategories(ordered.categories),
      activated: categories.activated,
      expanded: categories.expanded,
    },
    notes: notes.byId,
    modal,
  }),
  (dispatch: Dispatch<AppAction>) => ({
    actions: bindActionCreators({...notesActions, ...modalActions}, dispatch)
  })
)(ModalContainer);
