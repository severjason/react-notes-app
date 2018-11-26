import { AppAction } from '../../interfaces';
import { AppNavAction, AppTag, AppTagsState } from '../interfaces';
import * as types from './types';
import { toggleTagInArray } from '../../../helpers';

const INITIAL_STATE: AppTagsState = {
  basicTags: [],
  customTags: [],
  filteredTags: [],
  loaded: false,
  error: null,
};

export default function tagsReducer(state: AppTagsState = INITIAL_STATE, action: AppAction & AppNavAction) {
  switch (action.type) {
    case types.GET_TAGS_REQUEST: {
      return {
        ...state,
        loaded: false,
      };
    }
    case types.GET_CUSTOM_TAGS_SUCCESS: {
      return {
        ...state,
        customTags: action.payload ? action.payload : [],
        loaded: true,
      };
    }
    case types.GET_BASIC_TAGS_SUCCESS: {
      return {
        ...state,
        basicTags: action.payload ? action.payload : [],
        loaded: true,
      };
    }
    case types.GET_BASIC_TAGS_FAILED:
    case types.GET_CUSTOM_TAGS_FAILED: {
      return {
        ...state,
        loaded: true,
        error: action.payload,
      };
    }
    case types.FILTER_TAG: {
      return {
        ...state,
        filteredTags: toggleTagInArray(state.filteredTags, action.payload),
      };
    }
    case types.DELETE_TAG_REQUEST: {
      return {
        ...state,
        filteredTags: state.filteredTags.filter((tag: AppTag) => tag.id !== action.payload),
      };
    }
    case types.ACTIVATE_CATEGORY: {
      return {
        ...state,
        filteredTags: [],
      };
    }
    default: {
      return state;
    }
  }
}
