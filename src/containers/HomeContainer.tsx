import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../actions';
import { AppAction, AppAllActions, AppState, AppRoute, HomeProps } from '../interfaces/';
import { Home } from '../components';
import { getNotesArray } from '../selectors/notes';

interface AppHomeDispatch {
  actions: AppAllActions;
}

class HomeContainer extends React.Component<HomeProps & AppRoute & AppHomeDispatch, {}> {

  render() {
    return (
      <Home {...this.props}/>
    );
  }
}

export default connect<HomeProps, AppHomeDispatch>(
  (state: AppState) => ({
    notes: getNotesArray(state),
    notesIds: state.notes.allIds,
    categories: state.categories,
  }),
  (dispatch: Dispatch<AppAction>) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(HomeContainer);