import { AppAction } from '../../interfaces';
import { AppActionCategory, AppCategories } from '../interfaces';
import * as types from './types';

const INITIAL_STATE: any = {
  activated: null,
  expanded: false,
};

export default function categoriesReducer(state: AppCategories = INITIAL_STATE, action: AppAction & AppActionCategory) {
  switch (action.type) {
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
