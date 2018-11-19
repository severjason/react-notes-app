import * as noteTypes from './types';
import { AppActionNote, AppNote } from '../interfaces';

export const getNotes = (uid: string): AppActionNote => ({
  type: noteTypes.GET_ALL_NOTES_REQUEST,
  payload: uid,
});

export const getNote = (id: string): AppActionNote => ({
  type: noteTypes.GET_NOTE_REQUEST,
  payload: id,
});

export const getNoteForUpdate = (id: string): AppActionNote => ({
  type: noteTypes.GET_NOTE_FOR_UPDATE_REQUEST,
  payload: id,
});

export const toggleNote = (id: string, expanded: boolean): AppActionNote => ({
  type: noteTypes.TOGGLE_NOTE_REQUEST,
  payload: {
    id,
    expanded,
  }
});

export const deleteNote = (id: string): AppActionNote => ({
  type: noteTypes.DELETE_NOTE_REQUEST,
  payload: id,
});

export const addNote = (note: AppNote): AppActionNote => ({
  type: noteTypes.ADD_NOTE_REQUEST,
  payload: note,
});

export const updateNote = (note: AppNote): AppActionNote => ({
  type: noteTypes.UPDATE_NOTE_REQUEST,
  payload: note,
});
