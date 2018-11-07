import { AppAction } from '../../interfaces';
import { AppActionCategory, AppCategories } from '../interfaces';
import * as types from './types';
// import * as helpers from '../../../helpers';

const INITIAL_STATE: any = {
  activated: 'all',
  // categoriesList: ['all'],
  expanded: false,
};

export default function categoriesReducer(
  state: AppCategories = INITIAL_STATE,
  action: AppAction & AppActionCategory) {
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
        activated: (action.category) ? action.category : state.activated,
      };
    }
    /*case types.DELETE_CATEGORY: {
      return {
        ...state,
        categoriesList: state.categoriesList.filter((c: string) => c !== action.category),
      };
    }
    case types.ADD_CATEGORY: {
      const newCategories = (!state.categoriesList.includes(action.category))
        ? helpers.concatArrayUnique(state.categoriesList, [action.category])
        : state.categoriesList;
      return {
        ...state,
        categoriesList: newCategories,
      };
    }*/
    default: {
      return state;
    }
  }
}
