import * as noteTypes from './types';
import { AppActionNote, AppNote } from '../interfaces';
import { AppAction } from '../../interfaces';

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
