import * as noteTypes from './types';
import * as modalTypes from '../../modal/redux/types';
// import * as navTypes from '../../nav/redux/types';
import { AppActionNote, AppNote, AppNotesState } from '../interfaces';
import { AppAction, AppActionCategory, AppActionTags } from '../../interfaces';

const INITIAL_STATE: AppNotesState = {
  byId: {
    '1': {
      id: '1',
      title: 'First note',
      categories: ['work', 'health'],
      color: 'red',
      tags: ['important'],
      text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of ' +
        'classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin ' +
        'professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ' +
        'consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical ' +
        'literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 ' +
        'of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. ' +
        'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first ' +
        'line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n' +
        '\n' +
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ' +
        'Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced ' +
        'in their exact original form, accompanied by English versions from the 1914 translation by H. ' +
        'Rackham.',
      expanded: true,
    },
    '2': {
      id: '2',
      title: 'Second note',
      categories: ['work', 'private'],
      color: 'black',
      tags: ['personal', 'interesting'],
      text: 'First node text',
      expanded: true,
    },
    '3': {
      id: '3',
      title: 'Third note',
      categories: ['private', 'health'],
      color: 'green',
      tags: ['favourite', 'later', 'important'],
      text: 'some text',
      expanded: false,
    },
  },
  allIds: ['1', '2', '3'],
};

export default function notesReducer(state: AppNotesState = INITIAL_STATE,
                                     action: AppAction & AppActionNote & AppActionTags & AppActionCategory) {
  switch (action.type) {
    case noteTypes.GET_NOTES: {
      return state;
    }
    case noteTypes.TOGGLE_NOTE: {
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
          [action.note.id]: action.note,
        },
        allIds: [...state.allIds, action.note.id]
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
    }
    /*case navTypes.DELETE_CATEGORY_SUCCESS: {
      const filtered = {};
      Object.values(state.byId).map((note: AppNote) => {
        filtered[note.id] = {
          ...note,
          categories: note.categories.filter((c: string) => c !== action.payload.category),
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
