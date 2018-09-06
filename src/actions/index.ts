import { types }                                                               from '../constants/types';
import { AppAction, AppActionCategory, AppActionTags, AppActionNote, AppNote } from '../interfaces';
// import { Dispatch } from 'redux';

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

export const openModal = (): AppAction => ({
    type: types.modal.OPEN_MODAL,
});

export const closeModal = (): AppAction => ({
    type: types.modal.CLOSE_MODAL,
});

export const addNote = (note: AppNote): AppActionNote => ({
    type: types.notes.ADD_NOTE,
    note: note,
});

export const updateNote = (note: AppNote): AppActionNote => ({
    type: types.notes.UPDATE_NOTE,
    note: note,
});

export const openModalForUpdate = (modalProps: AppNote): AppAction => ({
    type: types.modal.OPEN_MODAL_FOR_UPDATE,
    modalProps: modalProps,
});

export const toggleCategories = (): AppAction => ({
    type: types.categories.TOGGLE_CATEGORIES,
});

export const activateCategory = (category: string): AppActionCategory => ({
    type: types.categories.ACTIVATE_CATEGORY,
    category: category,
});

export const addCustomTag = (tag: string): AppActionTags => ({
    type: types.tags.ADD_CUSTOM_TAG,
    tag: tag,
});

export const deleteCustomTag = (tag: string): AppActionTags => ({
    type: types.tags.DELETE_CUSTOM_TAG,
    tag: tag,
});

export const deleteCategory = (category: string): AppActionCategory => ({
    type: types.categories.DELETE_CATEGORY,
    category: category,
});

export const addCategory = (category: string): AppActionCategory => ({
    type: types.categories.ADD_CATEGORY,
    category: category,
});
