export interface AppAction {
    type: string;
    id?: string;
    modalProps?: AppNote;
}

export interface AppActionAddNote extends AppAction {
    note: AppNote;
}

export interface AppActions {
    getNotes(): AppAction;
    toggleNote(id: string): AppAction;
    addNote (note: AppNote): AppActionAddNote;
    updateNote (note: AppNote): AppActionAddNote;
    deleteNote(id: string): AppAction;
    openModal(): AppAction;
    closeModal(): AppAction;
    openModalForUpdate(modalProps: AppNote): AppAction;
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

export interface AppState {
    notes: AppNote[];
    modal: AppNoteModal;
    categories: AppCategories;
}

export interface AppNoteModal {
    opened: boolean;
    openedForUpdate: boolean;
    modalProps: any;
}

export interface AppCategories {
    active: string;
    categoriesList: string[];
}