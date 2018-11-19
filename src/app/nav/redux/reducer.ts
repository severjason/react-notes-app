import { AppAction } from '../../interfaces';
import { AppActionCategory, AppCategories } from '../interfaces';
import * as types from './types';

const INITIAL_STATE: AppCategories = {
  activated: null,
  categoriesList: [],
  expanded: false,
  loaded: false,
};

export default function categoriesReducer(state: AppCategories = INITIAL_STATE, action: AppAction & AppActionCategory) {
  switch (action.type) {
    case types.GET_CATEGORIES_REQUEST: {
      return {
        ...state,
        loaded: false,
      };
    }
    case types.GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        loaded: true,
        categoriesList: action.payload,
      };
    }
    case types.GET_CATEGORIES_FAILED: {
      return {
        ...state,
        loaded: true,
      };
    }
    case types.TOGGLE_CATEGORIES: {
      return {
        ...state,
        expanded: !state.expanded,
      };
    }
    case types.ACTIVATE_CATEGORY: {
      return {
        ...state,
        activated: (action.payload) ? action.payload : state.activated,
      };
    }
    default: {
      return state;
    }
  }
}
