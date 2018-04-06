import { AppAction, AppActionCategory, AppCategories } from '../interfaces';
import { types } from '../constants/types';

const INITIAL_STATE: AppCategories = {
    activated: 'all',
    categoriesList: ['all', 'work', 'private', 'health', 'work1', 'private1',
        'health1'],
    expanded: true,
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
        default: {
            return state;
        }
    }
}
