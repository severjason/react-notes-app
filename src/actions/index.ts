import { types }                                                               from './types';
import { AppAction, AppActionCategory, AppActionNote, AppNote } from '../app/interfaces';

export const getNotes = (): AppAction => ({
    type: types.notes.GET_NOTES,
});

export const toggleNote = (id: string): AppAction => ({
    type: types.notes.TOGGLE_NOTE,
    id: id,
});

export const deleteNote = (id: string): AppAction => ({
    type: types.notes.DELETE_NOTE,
    id: id,
});

export const addNote = (note: AppNote): AppActionNote => ({
    type: types.notes.ADD_NOTE,
    note: note,
});

export const updateNote = (note: AppNote): AppActionNote => ({
    type: types.notes.UPDATE_NOTE,
    note: note,
});

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
