import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as notesActions from '../redux/actions';
import * as modalActions from '../../modal/redux/actions';
import { NoteProps, AppNoteActions } from '../interfaces';
import { AppAction, AppModalActions, AppState } from '../../interfaces';
import { FullNote } from '../components';

interface AppHomeDispatch {
  actions: AppNoteActions & AppModalActions;
}

interface AppRoute {
  match: any;
}

class NoteContainer extends React.Component<NoteProps & AppRoute & AppHomeDispatch, {}> {

  render() {
    return (
      <FullNote {...this.props}/>
    );
  }
}

export default connect<NoteProps, AppHomeDispatch>(
  (state: AppState) => ({
    notes: state.notes.byId,
    activeCategory: state.categories.activated,
  }),
  (dispatch: Dispatch<AppAction>) => ({
    actions: bindActionCreators({...notesActions, ...modalActions}, dispatch)
  })
)(NoteContainer);
