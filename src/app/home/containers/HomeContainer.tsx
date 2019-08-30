import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import * as navActions from '../../nav/redux/actions';
import * as notesActions from '../../note/redux/actions';
import * as modalActions from '../../modal/redux/actions';
import {
  AppAction,
  AppAllActions,
  AppState,
  AppRoute,
  HomeProps,
  AppFirestore,
  AppWithFirebaseAuthProps,
} from '../../interfaces';
import { Home } from '../components';
import FullScreenLoading from '../../common/loading/FullScreen';
import { withFirebaseAuth } from '../../hocs';
import { ErrorPage } from '../../common';
import { getFilteredCategories } from '../../nav/redux/selectors';
import { getFilteredNotes } from '../../note/redux/selectors';

interface AppHomeDispatch {
  actions: AppAllActions;
}

class HomeContainer extends React.Component<HomeProps
  & AppRoute & AppHomeDispatch & AppWithFirebaseAuthProps, {}> {

  componentDidMount() {
    const {firebaseUser, actions} = this.props;
    const {auth: {uid}} = firebaseUser;
    if (uid) {
      actions.getNotes(uid);
    }
  }

  render() {
    const {actions, categories, tags, notes, match, notesAreLoaded, error} = this.props;
    return error
      ? <ErrorPage error={error}/>
      : categories.loaded && tags.loaded && notesAreLoaded
        ? <Home actions={actions} categories={categories} notes={notes} match={match}/>
        : <FullScreenLoading/>;
  }
}
export default compose<any>(
  withFirebaseAuth,
  connect<HomeProps, AppHomeDispatch>(
    (state: AppState & AppFirestore & any) => {
      const {notes} = state;
      return {
        categories: getFilteredCategories(state),
        tags: state.tags,
        notes: getFilteredNotes(state),
        notesAreLoaded: notes.notesAreLoaded,
        error: notes.error,
      };
    },
    (dispatch: Dispatch<AppAction>) => ({
      actions: bindActionCreators({...navActions, ...modalActions, ...notesActions}, dispatch)
    })
  )
)(HomeContainer);
