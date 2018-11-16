import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import * as modalActions from '../redux/actions';
import * as notesActions from '../../note/redux/actions';
import {
  AppAction,
  AppCategories,
  AppModal,
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

  render() {
    const {modal, categories, actions, firebaseUser: {auth}} = this.props;
    return (
      <NoteModal
        userId={auth.uid}
        modal={modal}
        categories={categories}
        actions={actions}
      />
    );
  }
}

export default compose(
  withFirebaseAuth,
  connect<AppModalProps, AppHomeDispatch>(
    ({categories, modal}:
       { categories: AppCategories, modal: AppTags & AppModal }) => ({
      categories: {
        categoriesList: filterCategories(categories.categoriesList),
        activated: categories.activated,
        expanded: categories.expanded,
      },
      modal,
    }),
    (dispatch: Dispatch<AppAction>) => ({
      actions: bindActionCreators({...notesActions, ...modalActions}, dispatch)
    })
  )
)(ModalContainer);
