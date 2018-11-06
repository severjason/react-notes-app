import * as types from './types';
import { AppAction } from '../../interfaces';
import { AppActionCategory } from '../interfaces';

export const toggleCategories = (): AppAction => ({
  type: types.TOGGLE_CATEGORIES,
});

export const activateCategory = (category: string): AppActionCategory => ({
  type: types.ACTIVATE_CATEGORY,
  category: category,
});

export const deleteCategory = (category: string): AppActionCategory => ({
  type: types.DELETE_CATEGORY,
  category: category,
});

export const addCategory = (category: string): AppActionCategory => ({
  type: types.ADD_CATEGORY,
  category: category,
});

export const fetchCategoriesRequest = (): AppAction => ({
  type: types.FETCH_CATEGORIES_REQUEST,
});
