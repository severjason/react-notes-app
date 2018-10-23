import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as navActions from '../redux/actions';
import * as modalActions from '../../modal/redux/actions';
import { AppCategoriesActions } from '../interfaces';
import { AppAction, AppCategories, AppModalActions } from '../../interfaces';
import { NavBar } from '../components';

interface NavContainerProps {
  categories: AppCategories;
}

interface NavContainerDispatch {
  actions: AppCategoriesActions & AppModalActions;
}

class NavContainer extends React.Component<NavContainerProps & NavContainerDispatch, {}> {

  render() {
    const {categories} = this.props;
    return (
      <NavBar opened={categories.expanded} {...this.props}/>
    );
  }
}

export default connect<NavContainerProps, NavContainerDispatch>(
  (state: NavContainerProps) => ({
    categories: state.categories,
  }),
  (dispatch: Dispatch<AppAction>) => ({
    actions: bindActionCreators({...navActions, ...modalActions}, dispatch)
  })
)(NavContainer);
