import * as types from './types';
import { AppAction } from '../../interfaces';
import { AppNavAction, AppCategory } from '../interfaces';

export const getCategories = (uid: string): AppNavAction => ({
  type: types.GET_CATEGORIES_REQUEST,
  payload: {
    uid,
  }
});

export const getTags = (uid: string): AppNavAction => ({
  type: types.GET_TAGS_REQUEST,
  payload: {
    uid,
  }
});

export const toggleCategories = (): AppAction => ({
  type: types.TOGGLE_CATEGORIES,
});

export const activateCategory = (category: AppCategory): AppNavAction => ({
  type: types.ACTIVATE_CATEGORY,
  payload: category,
});

export const deleteCategory = (id: string): AppNavAction => ({
  type: types.DELETE_CATEGORY_REQUEST,
  payload: {
    id
  },
});

export const addCategory = (category: string, uid: string): AppNavAction => ({
  type: types.ADD_CATEGORY_REQUEST,
  payload: {
    uid,
    category: category.toLowerCase(),
  }
});
