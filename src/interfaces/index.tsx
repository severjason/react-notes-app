export interface AppAction {
    type: string;
    id?: number;
}

export interface AppNote {
    id: number;
    title: string;
    categories: string[];
    color: string;
    tags: string[];
    text: string;
}

export interface AppState {
    notes: AppNote[];
}
