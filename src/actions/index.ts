import { types } from '../constants/types';
import { AppAction } from '../interfaces';

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

export const openModal = (modalProps: any): AppAction => ({
    type: types.modal.OPEN_MODAL,
    payload: modalProps,
});

export const closeModal = (): AppAction => ({
    type: types.modal.CLOSE_MODAL,
});
