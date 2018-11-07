import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import * as modalActions from '../redux/actions';
import * as notesActions from '../../note/redux/actions';
import { AppAction, AppCategories, AppModal, AppTags, AppWithFirebaseAuthProps } from '../../interfaces';
import { NoteModal } from '../components';
import { AppModalProps, AppModalActions, AppTagsActions } from '../interfaces';
import { AppNoteActions } from '../../note/interfaces';
import { filterCategories } from '../../../helpers';
import withFirebaseAuth from '../../hocs/withFirebaseAuth';
import { firestoreConnect } from 'react-redux-firebase';
import { CATEGORIES_COLLECTION } from '../../../constants';

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

export default compose(
  withFirebaseAuth,
  firestoreConnect((props: AppWithFirebaseAuthProps) => {
    const {auth: {uid}} = props.firebaseUser;
    return !uid ? [] : [
      {
        collection: CATEGORIES_COLLECTION,
        where: [
          ['uuid', '==', uid]
        ],
      }
    ];
  }),
  connect<AppModalProps, AppHomeDispatch>(
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
  )
)(ModalContainer);
