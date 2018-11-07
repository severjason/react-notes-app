import * as types from './types';
import { AppAction } from '../../interfaces';
import { AppActionCategory } from '../interfaces';

export const toggleCategories = (): AppAction => ({
  type: types.TOGGLE_CATEGORIES,
});

export const activateCategory = (category: string): AppActionCategory => ({
  type: types.ACTIVATE_CATEGORY,
  payload: {
    category
  },
});

export const deleteCategory = (category: string): AppActionCategory => ({
  type: types.DELETE_CATEGORY,
  payload: {
    category
  },
});

export const addCategory = (category: string, uuid: string): AppActionCategory => ({
  type: types.ADD_CATEGORY_REQUEST,
  payload: {
    uuid,
    category,
  }
});
