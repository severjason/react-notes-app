import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import * as navActions from '../redux/actions';
import * as modalActions from '../../modal/redux/actions';
import { logoutRequest } from '../../auth/redux/actions';
import { AppCategoriesActions } from '../interfaces';
import { AppLoginActions } from '../../auth/interfaces';
import { AppAction, AppCategories, AppModalActions } from '../../interfaces';
import { NavBar } from '../components';
import { firestoreConnect } from 'react-redux-firebase';
import { CATEGORIES_COLLECTION } from '../../../constants';
import { filterCategories } from '../../../helpers';

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
  firestoreConnect((props: any) => [
    { collection: CATEGORIES_COLLECTION } // or `todos/${props.todoId}`
  ]),
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
