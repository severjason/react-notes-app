import { AppAction, AppCategories, AppNote } from '../../interfaces';

export interface AppActionTags extends AppAction {
    tag: string;
}

export interface AppModalProps {
  modal: AppModal & AppTags;
  categories: AppCategories;
}

export interface AppModalPropsWithFirebase extends AppModalProps {
  categories: AppCategories;
}

export interface AppModalActions {
  openModal(): AppAction;
  closeModal(): AppAction;
  openModalForUpdate(id: string): AppAction;
}

export interface AppModal {
  opened: boolean;
  openedForUpdate: boolean;
  noteId: string | null;
  note: AppNote | null;
  noteLoaded?: boolean;
}

export interface AppTags {
    basicTags: string[];
    customTags: string[];
}

export interface AppTagsActions {
   addCustomTag(tag: string): AppActionTags;
   deleteCustomTag(tag: string): AppActionTags;
}
