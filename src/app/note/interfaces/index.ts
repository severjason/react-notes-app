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
  note: AppNotes;
  activeCategory: string;
}

export interface AppNotesState {
  byId: AppNotes;
  allIds: string[];
}

export interface AppNotes {
  [key: string]: AppNote;
}

export interface AppNoteActions {

  getNotes(): AppAction;

  toggleNote(id: any, expanded: boolean): AppAction;

  addNote(note: AppNote): AppActionNote;

  updateNote(note: AppNote): AppActionNote;

  deleteNote(id: string): AppAction;

}
