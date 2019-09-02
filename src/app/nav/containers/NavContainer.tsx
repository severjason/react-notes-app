import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import * as navActions from '../redux/actions';
import * as modalActions from '../../modal/redux/actions';
import { logoutRequest } from '../../auth/redux/actions';
import { AppCategories, AppNavActions, AppCategory, AppTagsState } from '../interfaces';
import { AppLoginActions } from '../../auth/interfaces';
import { AppAction, AppState, AppWithFirebaseAuthProps } from '../../interfaces';
import { NavBar } from '../components';
import { getFilteredCategories } from '../redux/selectors';
import withFirebaseAuth from '../../hocs/withFirebaseAuth';
import _isEqual from 'lodash/isEqual';
import { AppModalActions } from '../../modal/interfaces';

interface NavContainerProps {
  categories: AppCategories;
  tags: AppTagsState;
}

interface NavContainerDispatch {
  actions: AppNavActions & AppModalActions & AppLoginActions;
}

interface NavState {
  uid: string;
  categories: AppCategory[];
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
    const {categories: {activated, expanded}, tags, actions} = this.props;
    const {categories} = this.state;
    const allTags = [...tags.basicTags, ...tags.customTags];
    return (
      <NavBar
        filteredTags={tags.filteredTags}
        tags={allTags}
        categories={categories}
        activated={activated}
        expanded={expanded}
        actions={actions}
      />
    );
  }
}
export default compose<any>(
  withFirebaseAuth,
  connect<NavContainerProps, NavContainerDispatch>(
    (state: AppState & any) => ({
      categories: getFilteredCategories(state),
      tags: state.tags,
    }),
    (dispatch: Dispatch<AppAction>) => ({
      actions: bindActionCreators({...navActions, ...modalActions, logoutRequest}, dispatch)
    })
  )
)(NavContainer);
