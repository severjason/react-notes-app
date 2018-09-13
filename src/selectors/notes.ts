import { createSelector } from 'reselect';
import { AppNote, AppNotes, AppState } from '../interfaces';

const getNotesById = (state: AppState) => state.notes.byId;

const getActiveCategory = (state: AppState) => state.categories.activated;

export const getNotesArray = createSelector(getNotesById, (notes: AppNotes) => Object.values(notes));

export const getActiveNotes = createSelector(
  [getNotesArray, getActiveCategory],
  (notes: AppNote[], activeCategory: string) => (activeCategory === 'all')
    ? notes
    : notes.filter((note: AppNote) => note.categories.includes(activeCategory))
);
