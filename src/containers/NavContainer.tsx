import * as React                          from 'react';
import { connect }                         from 'react-redux';
import { bindActionCreators, Dispatch }    from 'redux';
import * as actions                        from '../actions';
import { AppAction, AppAllActions, AppCategories } from '../interfaces/';
import { NavBar }                            from '../components';

interface NavContainerProps {
  categories: AppCategories;
}

interface NavContainerDispatch {
  actions: AppAllActions;
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
    actions: bindActionCreators(actions, dispatch)
  })
)(NavContainer);