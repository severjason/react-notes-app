import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../../actions';
import { AppAction, AppAllActions, AppState, AppModalProps } from '../../interfaces';
import { NoteModal } from '../components';

interface AppHomeDispatch {
  actions: AppAllActions;
}

class ModalContainer extends React.Component<AppModalProps & AppHomeDispatch, {}> {

  render() {
    return (
      <NoteModal {...this.props}/>
    );
  }
}

export default connect<AppModalProps, AppHomeDispatch>(
  (state: AppState) => ({
    categories: state.categories,
    tags: state.tags,
    modal: state.modal,
  }),
  (dispatch: Dispatch<AppAction>) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(ModalContainer);