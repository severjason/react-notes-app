import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as navActions from '../../nav/redux/actions';
import * as notesActions from '../../note/redux/actions';
import * as modalActions from '../../modal/redux/actions';
import {
  AppAction,
  AppAllActions,
  AppState,
  AppRoute,
  HomeProps,
  AppFirestore,
} from '../../interfaces';
import { Home } from '../components';
import { getActiveNotes } from '../selectors/notes';
import { filterCategories } from '../../../helpers';

interface AppHomeDispatch {
  actions: AppAllActions;
}

class HomeContainer extends React.Component<HomeProps & AppRoute & AppHomeDispatch, {}> {

  render() {
    const {actions, categories, notes, match} = this.props;
    return (
      <Home actions={actions} categories={categories} notes={notes} match={match}/>
    );
  }
}

export default connect<HomeProps, AppHomeDispatch>(
  (state: AppState & AppFirestore) => {
    const {firestore: {ordered}, categories} = state;
    return {
      categories: {
        categoriesList: filterCategories(ordered.categories),
        activated: categories.activated,
        expanded: categories.expanded,
      },
      notes: getActiveNotes(state),
    };
  },
  (dispatch: Dispatch<AppAction>) => ({
    actions: bindActionCreators({...navActions, ...modalActions, ...notesActions}, dispatch)
  })
)(HomeContainer);
