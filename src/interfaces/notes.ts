import { AppAction } from './index';

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

export interface AppNoteActions {

    getNotes(): AppAction;

    toggleNote(id: string): AppAction;

    addNote(note: AppNote): AppActionNote;

    updateNote(note: AppNote): AppActionNote;

    deleteNote(id: string): AppAction;

}
