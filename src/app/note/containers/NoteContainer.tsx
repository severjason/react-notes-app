import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import * as notesActions from '../redux/actions';
import * as modalActions from '../../modal/redux/actions';
import { NoteProps, AppNoteActions, AppNotes } from '../interfaces';
import {
  AppAction,
  AppCategories,
  AppModalActions,
  AppWithFirebaseAuthProps
} from '../../interfaces';
import { FullNote } from '../components';
import withFirebaseAuth from '../../hocs/withFirebaseAuth';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { NOTES_COLLECTION } from '../../../constants';
import FullScreenLoading from '../../common/loading/FullScreen';

interface AppHomeDispatch {
  actions: AppNoteActions & AppModalActions;
}

interface AppRoute {
  match: any;
}

class NoteContainer extends React.Component<NoteProps & AppRoute & AppHomeDispatch, {}> {

  render() {
    const {note, actions, activeCategory} = this.props;
    return isLoaded(note)
      ? <FullNote note={note} actions={actions} activeCategory={activeCategory}/>
      : <FullScreenLoading/>;
  }
}

export default compose(
  withFirebaseAuth,
  firestoreConnect((props: AppWithFirebaseAuthProps & AppRoute) => {
    const {params: {noteId}} = props.match;
    return !noteId ? [] : [
      {
        collection: NOTES_COLLECTION,
        doc: noteId,
        storeAs: 'note',
      }
    ];
  }),
  connect<NoteProps, AppHomeDispatch>(
    ({firestore: {ordered}, categories}:
       { firestore: any, categories: AppCategories, note: AppNotes }) => {
      return {
        activeCategory: categories.activated,
        note: ordered.note && ordered.note,
      };
    },
    (dispatch: Dispatch<AppAction>) => ({
      actions: bindActionCreators({...notesActions, ...modalActions}, dispatch)
    })
  )
)(NoteContainer);
