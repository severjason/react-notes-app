export interface AppAction {
    type: string;
    id?: string;
    modalProps?: AppNote;
}

export interface AppActionNote extends AppAction {
    note: AppNote;
}

export interface AppActionCategory extends AppAction {
    category: string;
}

export interface AppActionTags extends AppAction {
    tag: string;
}

export interface AppActions {

    getNotes(): AppAction;

    toggleNote(id: string): AppAction;

    addNote(note: AppNote): AppActionNote;

    updateNote(note: AppNote): AppActionNote;

    deleteNote(id: string): AppAction;

    openModal(): AppAction;

    closeModal(): AppAction;

    openModalForUpdate(modalProps: AppNote): AppAction;

    addCustomTag(tag: string): AppActionTags;

    deleteCustomTag(tag: string): AppActionTags;

    toggleCategories(): AppAction;

    activateCategory(category: string): AppActionCategory;
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
    tags: AppTags;
}

export interface AppNoteModal {
    opened: boolean;
    openedForUpdate: boolean;
    modalProps: any;
}

export interface AppCategories {
    activated: string;
    categoriesList: string[];
    expanded: boolean;
}

export interface AppTags {
    basicTags: string[];
    customTags: string[];
}