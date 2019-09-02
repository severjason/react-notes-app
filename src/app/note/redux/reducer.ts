import * as noteTypes from './types';
// import * as modalTypes from '../../modal/redux/types';
// import * as navTypes from '../../nav/redux/types';
import { AppActionNote, AppNotesState } from '../interfaces';
import { AppAction } from '../../interfaces';
import { AppNavAction } from '../../nav/interfaces';

const INITIAL_STATE: AppNotesState = {
  allNotes: [],
  notesAreLoaded: false,
  viewedNote: null,
  viewedNoteLoaded: false,
  error: null,
};

export default function notesReducer(state: AppNotesState = INITIAL_STATE,
                                     action: AppAction & AppActionNote & AppNavAction) {
  switch (action.type) {
    case noteTypes.GET_ALL_NOTES_REQUEST: {
      return {
        ...state,
        notesAreLoaded: false,
        viewedNoteLoaded: false,
      };
    }
    case noteTypes.GET_ALL_NOTES_SUCCESS: {
      return {
        ...state,
        notesAreLoaded: true,
        viewedNoteLoaded: false,
        allNotes: action.payload,
      };
    }
    case noteTypes.GET_ALL_NOTES_FAILED: {
      return {
        ...state,
        notesAreLoaded: false,
        error: action.payload,
      };
    }
    case noteTypes.GET_NOTE_REQUEST: {
      return {
        ...state,
        viewedNoteLoaded: false,
        viewedNote: null,
      };
    }
    case noteTypes.GET_NOTE_FAILED: {
      return {
        ...state,
        error: action.payload,
        viewedNoteLoaded: false,
        viewedNote: null,
      };
    }
    case noteTypes.GET_NOTE_SUCCESS: {
      return {
        ...state,
        viewedNoteLoaded: true,
        viewedNote: action.payload,
      };
    }
    case noteTypes.DELETE_NOTE_SUCCESS: {
      return {
        ...state,
        viewedNoteLoaded: false,
      };
    }
    default: {
      return state;
    }
  }
}
