import { createSelector } from 'reselect';
import { AppState } from '../../interfaces';
// @ts-ignore
import _difference from 'lodash/difference';
import { AppNote } from '../interfaces';

const getNotesState = (state: AppState) => state.notes.allNotes;

const getFilteredTags = (state: AppState): string[] =>
  state.tags.filteredTags.map((tag: any) => tag.id);

export const getFilteredNotes = createSelector(
  [getNotesState, getFilteredTags],
  (notes: AppNote[], filteredTags: string[]) => {
    return notes.filter((note: AppNote) => {
      const noteTags = note.tags.map(tag => tag.id);
      return (_difference(filteredTags, noteTags).length === 0) ? noteTags : false;
    });
  });
