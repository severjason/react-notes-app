import { types } from '../constants/types';
import { AppAction, AppActionAddNote, AppNote } from '../interfaces';
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

export const addNote = (note: AppNote): AppActionAddNote => ({
    type: types.notes.ADD_NOTE,
    note: note,
});

export const updateNote = (note: AppNote): AppActionAddNote => ({
    type: types.notes.UPDATE_NOTE,
    note: note,
});

export const openModalForUpdate = (modalProps: AppNote): AppAction => ({
    type: types.modal.OPEN_MODAL_FOR_UPDATE,
    modalProps: modalProps,
});
