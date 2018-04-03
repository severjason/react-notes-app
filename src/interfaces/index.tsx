export interface AppAction {
    type: string;
    id?: string;
    payload?: any;
}

export interface AppActions {
    getNotes(): AppAction;
    toggleNote(id: string): AppAction;
    deleteNote(id: string): AppAction;
    openModal(modalProps: any): AppAction;
    closeModal(): AppAction;
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
    modals: any;
}
