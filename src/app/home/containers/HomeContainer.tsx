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
import { filterCategories } from '../../../helpers';
import FullScreenLoading from '../../common/loading/FullScreen';
import { withFirebaseAuth } from '../../hocs';
import { ErrorPage } from '../../common';

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
    const {actions, categories, notes, match, notesAreLoaded, error} = this.props;
    return error
      ? <ErrorPage error={error}/>
      : categories.loaded && notesAreLoaded
        ? <Home actions={actions} categories={categories} notes={notes} match={match}/>
        : <FullScreenLoading/>;
  }
}
export default compose(
  withFirebaseAuth,
  connect<HomeProps, AppHomeDispatch>(
    (state: AppState & AppFirestore) => {
      const {categories, notes} = state;
      return {
        categories: {
          ...categories,
          categoriesList: filterCategories(categories.categoriesList),
        },
        notes: notes.allNotes,
        notesAreLoaded: notes.notesAreLoaded,
        error: notes.error,
      };
    },
    (dispatch: Dispatch<AppAction>) => ({
      actions: bindActionCreators({...navActions, ...modalActions, ...notesActions}, dispatch)
    })
  )
)(HomeContainer);
