import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../../actions';
import * as notesActions from '../../Note/redux/actions';
import * as modalActions from '../../Modal/redux/actions';
import { AppAction, AppAllActions, AppState, AppRoute, HomeProps } from '../../interfaces';
import { Home } from '../components';
import { getActiveNotes } from '../selectors/notes';

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
    notes: getActiveNotes(state),
    categories: state.categories,
  }),
  (dispatch: Dispatch<AppAction>) => ({
    actions: bindActionCreators({...actions, ...modalActions, ...notesActions}, dispatch)
  })
)(HomeContainer);
