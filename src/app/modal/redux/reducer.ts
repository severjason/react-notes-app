import { AppActionTags, AppTags, AppModal, AppModalActions } from '../interfaces';
import * as  types from '../redux/types';
import * as helpers from '../../../helpers';
import * as noteTypes from '../../note/redux/types';
import { AppActionNote } from '../../note/interfaces';

const INITIAL_STATE: AppTags & AppModal = {
  opened: false,
  openedForUpdate: false,
  note: null,
  noteId: null,
  basicTags: ['favourite', 'personal', 'interesting', 'later', 'important'],
  customTags: [],
  noteLoaded: false,
};

export default function (state: AppTags & AppModal = INITIAL_STATE,
                         action: AppActionTags & AppModalActions & AppActionNote) {
  switch (action.type) {
    case noteTypes.GET_NOTE_FOR_UPDATE_REQUEST: {
      return {
        ...state,
        noteLoaded: false,
      };
    }
    case noteTypes.GET_NOTE_FOR_UPDATE_SUCCESS: {
      return {
        ...state,
        note: action.payload,
        noteLoaded: true,
      };
    }
    case types.ADD_CUSTOM_TAG: {
      const customTagsArray = (!state.basicTags.includes(action.tag))
        ? helpers.concatArrayUnique(state.customTags, [action.tag])
        : state.customTags;
      return {
        ...state,
        customTags: customTagsArray,
      };
    }
    case types.DELETE_CUSTOM_TAG: {
      return {
        ...state,
        customTags: state.customTags.filter((t: string) => t !== action.tag),
      };
    }
    case types.OPEN_MODAL: {
      return {
        ...state,
        opened: true,
      };
    }
    case types.OPEN_MODAL_FOR_UPDATE: {
      return {
        ...state,
        opened: true,
        openedForUpdate: true,
        noteId: action.id,
      };
    }
    case types.CLOSE_MODAL: {
      return {
        ...state,
        opened: false,
        openedForUpdate: false,
        noteId: null,
        note: null,
      };
    }
    default: {
      return state;
    }
  }
}
