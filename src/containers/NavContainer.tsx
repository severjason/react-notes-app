import * as React                          from 'react';
import { connect }                         from 'react-redux';
import { bindActionCreators, Dispatch }    from 'redux';
import * as actions                        from '../actions';
import { AppAction, AppAllActions, AppCategories, AppModal } from '../interfaces/';
import { NavBar }                            from '../components';

interface NavContainerProps {
  modal: AppModal;
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
    modal: state.modal,
    categories: state.categories,
  }),
  (dispatch: Dispatch<AppAction>) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(NavContainer);