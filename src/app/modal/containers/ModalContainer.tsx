import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import * as modalActions from '../redux/actions';
import * as notesActions from '../../note/redux/actions';
import * as navActions from '../../nav/redux/actions';
import { AppAction, AppState, AppWithFirebaseAuthProps } from '../../interfaces';
import { NoteModal } from '../components';
import { AppModalProps, AppModalPropsWithFirebase, AppModalActions } from '../interfaces';
import { AppNoteActions } from '../../note/interfaces';
import withFirebaseAuth from '../../hocs/withFirebaseAuth';
import { AppNavActions } from '../../nav/interfaces';
import { getFilteredCategories } from '../../nav/redux/selectors';

interface AppHomeDispatch {
  actions: AppModalActions & AppNoteActions & AppNavActions;
}

class ModalContainer extends
  React.Component<AppModalPropsWithFirebase & AppWithFirebaseAuthProps & AppHomeDispatch, {}> {

  render() {
    const {modal, categories, tags, actions, firebaseUser: {auth}} = this.props;
    return (
      <NoteModal
        userId={auth.uid}
        modal={modal}
        categories={categories}
        actions={actions}
        tags={tags}
      />
    );
  }
}

export default compose(
  withFirebaseAuth,
  connect<AppModalProps, AppHomeDispatch>(
    (state: AppState) => ({
      categories: getFilteredCategories(state),
      tags: state.tags,
      modal: state.modal,
    }),
    (dispatch: Dispatch<AppAction>) => ({
      actions: bindActionCreators({...notesActions, ...modalActions, ...navActions}, dispatch)
    })
  )
)(ModalContainer);
