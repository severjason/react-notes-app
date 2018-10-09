import { types }                                                               from './types';
import { AppAction, AppActionCategory } from '../app/interfaces';

export const toggleCategories = (): AppAction => ({
    type: types.categories.TOGGLE_CATEGORIES,
});

export const activateCategory = (category: string): AppActionCategory => ({
    type: types.categories.ACTIVATE_CATEGORY,
    category: category,
});

export const deleteCategory = (category: string): AppActionCategory => ({
    type: types.categories.DELETE_CATEGORY,
    category: category,
});

export const addCategory = (category: string): AppActionCategory => ({
    type: types.categories.ADD_CATEGORY,
    category: category,
});
