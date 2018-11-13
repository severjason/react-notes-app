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
import { filterCategories } from '../../../helpers';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { NOTES_COLLECTION } from '../../../constants';
import FullScreenLoading from '../../common/loading/FullScreen';
import { withFirebaseAuth } from '../../hocs';

interface AppHomeDispatch {
  actions: AppAllActions;
}

class HomeContainer extends React.Component<HomePropsWithFirebase
  & AppRoute & AppHomeDispatch & AppWithFirebaseAuthProps, {}> {

  createNotesQuery(uid: string) {
    return !uid ? {} : {
      collection: NOTES_COLLECTION,
      where: [
        ['uid', '==', uid],
      ],
    };
  }

  componentDidMount() {
    const {firestore, firebaseUser} = this.props;
    const {auth: {uid}} = firebaseUser;
    const query = this.createNotesQuery(uid);
    if (Object.keys(query).length) {
      firestore.onSnapshot(query);
    }
  }

  render() {
    const {actions, categories, notes, match} = this.props;
    return categories.loaded && isLoaded(notes)
      ? <Home actions={actions} categories={categories} notes={notes} match={match}/>
      : <FullScreenLoading/>;
  }
}
export default compose(
  withFirebaseAuth,
  firestoreConnect(),
  connect<HomeProps, AppHomeDispatch>(
    (state: AppState & AppFirestore) => {
      const {firestore: {ordered}, categories} = state;
      // console.log(ordered.notes);
      return {
        categories: {
          categoriesList: filterCategories(ordered.categories),
          activated: categories.activated,
          expanded: categories.expanded,
          loaded: isLoaded(ordered.categories),
        },
        notes: ordered.notes,
      };
    },
    (dispatch: Dispatch<AppAction>) => ({
      actions: bindActionCreators({...navActions, ...modalActions, ...notesActions}, dispatch)
    })
  )
)(HomeContainer);
