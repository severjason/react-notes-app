import { AppAction, AppCategory } from '../../interfaces';

export interface AppActionNote {
  type: string;
  note?: AppNote;
  payload: any;
}

export interface AppNote {
  id?: string;
  title: string;
  uid: string;
  category: AppCategory | null;
  color: string;
  tags: string[];
  text: string;
  expanded: boolean;
}

export interface NoteProps {
  userId?: string;
  note: AppNote | null;
  noteIsLoading?: boolean;
  activeCategory: string;
}

export interface AppNotesState {
  byId: AppNotes;
  allIds: string[];
  viewedNote: AppNote | null;
  viewedNoteLoading: boolean;
}

export interface AppNotes {
  [key: string]: AppNote;
}

export interface AppNoteActions {

  getNotes(): AppAction;

  getNote(id: string): AppActionNote;

  toggleNote(id: any, expanded: boolean): AppAction;

  addNote(note: AppNote): AppActionNote;

  updateNote(note: AppNote): AppActionNote;

  deleteNote(id: string): AppAction;

}
