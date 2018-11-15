import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import * as notesActions from '../redux/actions';
import * as modalActions from '../../modal/redux/actions';
import { NoteProps, AppNoteActions, AppNotesState } from '../interfaces';
import {
  AppAction,
  AppCategories,
  AppModalActions, AppWithFirebaseAuthProps,
} from '../../interfaces';
import { FullNote } from '../components';
import withFirebaseAuth from '../../hocs/withFirebaseAuth';
import FullScreenLoading from '../../common/loading/FullScreen';
import { ErrorPage } from '../../common';

interface AppHomeDispatch {
  actions: AppNoteActions & AppModalActions;
}

interface AppRoute {
  match: any;
}

class NoteContainer extends React.Component<NoteProps & AppWithFirebaseAuthProps & AppRoute & AppHomeDispatch, {}> {

  componentDidMount(): void {
    const {actions: {getNote}, match} = this.props;
    const {params: {noteId}} = match;
    getNote(noteId);
  }

  render() {
    const {note, actions, activeCategory, noteIsLoaded, firebaseUser, error} = this.props;
    const {auth: {uid}} = firebaseUser;
    return error
      ? <ErrorPage error={error}/>
      : noteIsLoaded
        ? <FullNote userId={uid} note={note} actions={actions} activeCategory={activeCategory}/>
        : <FullScreenLoading/>;
  }
}

export default compose(
  withFirebaseAuth,
  connect<NoteProps, AppHomeDispatch>(
    ({categories, notes: {viewedNote, viewedNoteLoaded, error}}:
       { categories: AppCategories, notes: AppNotesState }) => {
      return {
        activeCategory: categories.activated && categories.activated.name,
        note: viewedNote,
        noteIsLoaded: viewedNoteLoaded,
        error,
      };
    },
    (dispatch: Dispatch<AppAction>) => ({
      actions: bindActionCreators({...notesActions, ...modalActions}, dispatch)
    })
  )
)(NoteContainer);
