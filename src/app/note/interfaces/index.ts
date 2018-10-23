import { AppAction } from '../../interfaces';

export interface AppActionNote extends AppAction {
  note: AppNote;
}

export interface AppNote {
  id: string;
  title: string;
  categories: string[];
  color: string;
  tags: string[];
  text: string;
  expanded: boolean;
}

export interface NoteProps {
  notes: AppNotes;
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

  toggleNote(id: string): AppAction;

  addNote(note: AppNote): AppActionNote;

  updateNote(note: AppNote): AppActionNote;

  deleteNote(id: string): AppAction;

}
