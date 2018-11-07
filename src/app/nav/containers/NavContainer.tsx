import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import * as navActions from '../redux/actions';
import * as modalActions from '../../modal/redux/actions';
import { logoutRequest } from '../../auth/redux/actions';
import { AppCategoriesActions } from '../interfaces';
import { AppLoginActions } from '../../auth/interfaces';
import { AppAction, AppCategories, AppModalActions, AppWithFirebaseAuthProps } from '../../interfaces';
import { NavBar } from '../components';
import { firestoreConnect } from 'react-redux-firebase';
import { CATEGORIES_COLLECTION } from '../../../constants';
import { filterCategories } from '../../../helpers';
import withFirebaseAuth from '../../hocs/withFirebaseAuth';

interface NavContainerProps {
  categories: AppCategories;
}

interface NavContainerDispatch {
  actions: AppCategoriesActions & AppModalActions & AppLoginActions;
}

class NavContainer extends React.Component<NavContainerProps & NavContainerDispatch, {}> {

  render() {
    const {categories, actions} = this.props;
    return (
      <NavBar categories={categories} actions={actions}/>
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
  connect<NavContainerProps, NavContainerDispatch>(
    ({ firestore: { ordered }, categories}: {firestore: any, categories: AppCategories}) => ({
      categories: {
        categoriesList: filterCategories(ordered.categories),
        activated: categories.activated,
        expanded: categories.expanded,
      }
    }),
    (dispatch: Dispatch<AppAction>) => ({
      actions: bindActionCreators({...navActions, ...modalActions, logoutRequest}, dispatch)
    })
  )
)(NavContainer);
