import * as types from './types';
import { AppAction } from '../../interfaces';
import { AppActionCategory, AppCategory } from '../interfaces';

export const getCategories = (uid: string): AppActionCategory => ({
  type: types.GET_CATEGORIES_REQUEST,
  payload: {
    uid,
  }
});

export const toggleCategories = (): AppAction => ({
  type: types.TOGGLE_CATEGORIES,
});

export const activateCategory = (category: AppCategory): AppActionCategory => ({
  type: types.ACTIVATE_CATEGORY,
  payload: category,
});

export const deleteCategory = (id: string): AppActionCategory => ({
  type: types.DELETE_CATEGORY_REQUEST,
  payload: {
    id
  },
});

export const addCategory = (category: string, uid: string): AppActionCategory => ({
  type: types.ADD_CATEGORY_REQUEST,
  payload: {
    uid,
    category: category.toLowerCase(),
  }
});
