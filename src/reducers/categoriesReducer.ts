import { AppAction, AppActionCategory, AppCategories } from '../app/interfaces';
import { types }                                       from '../actions/types';
import * as helpers                                    from '../helpers';

const INITIAL_STATE: AppCategories = {
  activated: 'all',
  categoriesList: ['all', 'work', 'private', 'health'],
  expanded: false,
};

export default function categoriesReducer(
  state: AppCategories = INITIAL_STATE,
  action: AppAction & AppActionCategory) {
  switch (action.type) {
    case types.categories.TOGGLE_CATEGORIES: {
      return {
        ...state,
        expanded: !state.expanded,
      };
    }
    case types.categories.ACTIVATE_CATEGORY: {
      return {
        ...state,
        activated: (state.categoriesList.includes(action.category) ? action.category : state.activated),
      };
    }
    case types.categories.DELETE_CATEGORY: {
      return {
        ...state,
        categoriesList: state.categoriesList.filter((c: string) => c !== action.category),
      };
    }
    case types.categories.ADD_CATEGORY: {
      const newCategories = (!state.categoriesList.includes(action.category))
        ? helpers.concatArrayUnique(state.categoriesList, [action.category])
        : state.categoriesList;
      return {
        ...state,
        categoriesList: newCategories,
      };
    }
    default: {
      return state;
    }
  }
}
