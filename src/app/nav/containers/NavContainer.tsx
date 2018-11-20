import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import * as navActions from '../redux/actions';
import * as modalActions from '../../modal/redux/actions';
import { logoutRequest } from '../../auth/redux/actions';
import { AppCategories, AppNavActions, AppCategory, AppTag } from '../interfaces';
import { AppLoginActions } from '../../auth/interfaces';
import { AppAction, AppModalActions, AppWithFirebaseAuthProps } from '../../interfaces';
import { NavBar } from '../components';
import { filterCategories } from '../../../helpers';
import withFirebaseAuth from '../../hocs/withFirebaseAuth';
// @ts-ignore
import _isEqual from 'lodash/isEqual';

interface NavContainerProps {
  categories: AppCategories;
}

interface NavContainerDispatch {
  actions: AppNavActions & AppModalActions & AppLoginActions;
}

interface NavState {
  uid: string;
  categories: AppCategory[];
  tags: AppTag[];
}

class NavContainer extends React.Component<NavContainerProps
  & AppWithFirebaseAuthProps & NavContainerDispatch, NavState> {

  static getDerivedStateFromProps(nextProps: Readonly<NavContainerProps &
                                    AppWithFirebaseAuthProps & NavContainerDispatch>,
                                  prevState: Readonly<NavState>) {
    if (!_isEqual(nextProps.categories.categoriesList, prevState.categories)) {
      return {
        categories: nextProps.categories.categoriesList,
      };
    } else {
      return null;
    }
  }

  constructor(props: NavContainerProps & AppWithFirebaseAuthProps & NavContainerDispatch) {
    super(props);
    this.state = {
      uid: this.props.firebaseUser.auth.uid,
      categories: this.props.categories.categoriesList,
      tags: this.props.categories.tags,
    };
  }

  componentDidUpdate(prevProps: Readonly<NavContainerProps & AppWithFirebaseAuthProps & NavContainerDispatch>,
                     prevState: Readonly<NavState>, snapshot?: any): void {
    if (prevProps.firebaseUser.auth.uid && prevProps.firebaseUser.auth.uid !== prevState.uid) {
      const {actions, firebaseUser} = this.props;
      this.setState({uid: firebaseUser.auth.uid}, () => {
        actions.getTags(this.state.uid);
        actions.getCategories(this.state.uid);
      });
    }
  }

  render() {
    const {categories: {activated, expanded}, actions} = this.props;
    const {categories} = this.state;
    return (
      <NavBar categories={categories} activated={activated} expanded={expanded} actions={actions}/>
    );
  }
}
export default compose(
  withFirebaseAuth,
  connect<NavContainerProps, NavContainerDispatch>(
    ({ categories}: {categories: AppCategories}) => {
      return {
        categories: {
          ...categories,
          categoriesList: filterCategories(categories.categoriesList),
        },
      };
    },
    (dispatch: Dispatch<AppAction>) => ({
      actions: bindActionCreators({...navActions, ...modalActions, logoutRequest}, dispatch)
    })
  )
)(NavContainer);
