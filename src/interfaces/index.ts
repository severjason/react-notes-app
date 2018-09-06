import { AppNote } from './notes';
import { AppTags } from './tags';
import { AppCategories } from './categories';
import { AppModal } from './modal';

export interface AppAction {
    type: string;
    id?: string;
    modalProps?: AppNote;
}

export interface AppState {
    notes: AppNote[];
    modal: AppModal;
    categories: AppCategories;
    tags: AppTags;
}

