import { AppActionTags, AppTags, AppModal, AppModalActions } from '../interfaces';
import * as  types from '../redux/types';
import * as helpers from '../../../helpers';

const INITIAL_STATE: AppTags & AppModal = {
  opened: false,
  openedForUpdate: false,
  noteId: null,
  basicTags: ['favourite', 'personal', 'interesting', 'later', 'important'],
  customTags: [],
};

export default function (state: AppTags & AppModal = INITIAL_STATE,
                         action: AppActionTags & AppModalActions) {
  switch (action.type) {
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
      };
    }
    default: {
      return state;
    }
  }
}
