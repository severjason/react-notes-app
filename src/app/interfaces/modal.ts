import { AppAction } from './index';

export interface AppModalActions {
    openModal(): AppAction;
    closeModal(): AppAction;
    openModalForUpdate(id: string): AppAction;
}

export interface AppModal {
    opened: boolean;
    openedForUpdate: boolean;
    noteId: string | null;
}
