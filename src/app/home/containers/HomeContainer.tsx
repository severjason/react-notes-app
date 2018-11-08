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
  HomePropsWithFirebase,
  AppFirestore,
  AppWithFirebaseAuthProps,
} from '../../interfaces';
import { Home } from '../components';
import { getActiveNotes } from '../selectors/notes';
import { filterCategories } from '../../../helpers';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { CATEGORIES_COLLECTION } from '../../../constants';
import FullScreenLoading from '../../common/loading/FullScreen';
import { withFirebaseAuth } from '../../hocs';

interface AppHomeDispatch {
  actions: AppAllActions;
}

class HomeContainer extends React.Component<HomePropsWithFirebase
  & AppRoute & AppHomeDispatch & AppWithFirebaseAuthProps, {}> {

  render() {
    const {actions, categories, notes, match} = this.props;
    return categories.loaded
      ? <Home actions={actions} categories={categories} notes={notes} match={match}/>
      : <FullScreenLoading/>;
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
  connect<HomeProps, AppHomeDispatch>(
    (state: AppState & AppFirestore) => {
      const {firestore: {ordered}, categories} = state;
      return {
        categories: {
          categoriesList: filterCategories(ordered.categories),
          activated: categories.activated,
          expanded: categories.expanded,
          loaded: isLoaded(ordered.categories),
        },
        notes: getActiveNotes(state),
      };
    },
    (dispatch: Dispatch<AppAction>) => ({
      actions: bindActionCreators({...navActions, ...modalActions, ...notesActions}, dispatch)
    })
  )
)(HomeContainer);
