import * as noteTypes from './types';
// import * as modalTypes from '../../modal/redux/types';
// import * as navTypes from '../../nav/redux/types';
import { AppActionNote, AppNotesState } from '../interfaces';
import { AppAction, AppActionCategory, AppActionTags } from '../../interfaces';

const INITIAL_STATE: AppNotesState = {
  byId: {
  },
  allIds: ['1', '2', '3'],
  viewedNote: null,
  viewedNoteLoading: false,
};

export default function notesReducer(state: AppNotesState = INITIAL_STATE,
                                     action: AppAction & AppActionNote & AppActionTags & AppActionCategory) {
  switch (action.type) {
    case noteTypes.GET_NOTES: {
      return state;
    }
    case noteTypes.GET_NOTE_REQUEST: {
      return {
        ...state,
        viewedNoteLoading: true,
        viewedNote: null,
      };
    }
    case noteTypes.GET_NOTE_FAILED: {
      return {
        ...state,
        viewedNoteLoading: false,
        viewedNote: null,
      };
    }
    case noteTypes.GET_NOTE_SUCCESS: {
      return {
        ...state,
        viewedNoteLoading: false,
        viewedNote: action.payload,
      };
    }
/*    case noteTypes.TOGGLE_NOTE: {
      // @ts-ignore
      const toggledNote: AppNote = state.byId[action.id];
      toggledNote.expanded = !toggledNote.expanded;
      return {
        ...state,
        byId: {
          ...state.byId,
          [toggledNote.id]: toggledNote,
        }
      };

    }
    case noteTypes.DELETE_NOTE: {
      const newObj = {};
      Object.values(state.byId).map((note: AppNote) => {
        if (note.id !== action.id) {
          newObj[note.id] = note;
        }
      });
      return {
        ...state,
        byId: newObj,
        allIds: state.allIds.filter((id: string) => id !== action.id),
      };
    }
    case noteTypes.ADD_NOTE:
    case noteTypes.UPDATE_NOTE: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
        allIds: [...state.allIds, action.payload.id]
      };
    }
    case modalTypes.DELETE_CUSTOM_TAG: {
      const filtered = {};
      Object.values(state.byId).map((note: AppNote) => {
        filtered[note.id] = {
          ...note,
          tags: note.tags.filter((tag: string) => tag !== action.tag),
        };
      });
      return {
        ...state,
        byId: filtered,
      };
    }*/
    /*case navTypes.DELETE_CATEGORY_SUCCESS: {
      const filtered = {};
      Object.values(state.byId).map((note: AppNote) => {
        filtered[note.id] = {
          ...note,
          category: note.category === action.payload ? null : note.category,
        };
      });
      return {
        ...state,
        byId: filtered,
      };
    }*/
    default: {
      return state;
    }
  }
}
