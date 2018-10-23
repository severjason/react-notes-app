import * as noteTypes from './types';
import * as navTypes from '../../Nav/redux/types';
import { AppActionNote, AppNote } from '../interfaces';
import { AppAction, AppActionCategory } from '../../interfaces';

export const getNotes = (): AppAction => ({
  type: noteTypes.GET_NOTES,
});

export const toggleNote = (id: string): AppAction => ({
  type: noteTypes.TOGGLE_NOTE,
  id: id,
});

export const deleteNote = (id: string): AppAction => ({
  type: noteTypes.DELETE_NOTE,
  id: id,
});

export const addNote = (note: AppNote): AppActionNote => ({
  type: noteTypes.ADD_NOTE,
  note: note,
});

export const updateNote = (note: AppNote): AppActionNote => ({
  type: noteTypes.UPDATE_NOTE,
  note: note,
});

export const toggleCategories = (): AppAction => ({
  type: navTypes.TOGGLE_CATEGORIES,
});

export const activateCategory = (category: string): AppActionCategory => ({
  type: navTypes.ACTIVATE_CATEGORY,
  category: category,
});

export const deleteCategory = (category: string): AppActionCategory => ({
  type: navTypes.DELETE_CATEGORY,
  category: category,
});

export const addCategory = (category: string): AppActionCategory => ({
  type: navTypes.ADD_CATEGORY,
  category: category,
});
