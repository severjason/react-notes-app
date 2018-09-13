import { createSelector } from 'reselect';
import { AppNotes, AppState } from '../interfaces';

const getNotesById = (state: AppState) => state.notes.byId;

export const getNotesArray = createSelector(getNotesById, (notes: AppNotes) => Object.values(notes));