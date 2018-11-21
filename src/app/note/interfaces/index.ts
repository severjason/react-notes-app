import { AppAction, AppCategory } from '../../interfaces';
import { AppTag } from '../../nav/interfaces';

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
  tags: AppTag[];
  text: string;
  expanded: boolean;
}

export interface NoteProps {
  userId?: string;
  note: AppNote | null;
  error?: any;
  noteIsLoaded?: boolean;
  activeCategory: string | null;
}

export interface AppNotesState {
  allNotes: AppNote[];
  notesAreLoaded: boolean;
  viewedNote: AppNote | null;
  viewedNoteLoaded: boolean;
  error: any;
}

export interface AppNotes {
  [key: string]: AppNote;
}

export interface AppNoteActions {

  getNotes(uid: string): AppAction;

  getNote(id: string): AppActionNote;

  getNoteForUpdate(id: string): AppActionNote;

  toggleNote(id: any, expanded: boolean): AppAction;

  addNote(note: AppNote): AppActionNote;

  updateNote(note: AppNote): AppActionNote;

  deleteNote(id: string): AppAction;

}
