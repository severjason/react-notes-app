import { AppAction, AppCategories, AppNotes } from '../../interfaces';

export interface AppActionTags extends AppAction {
    tag: string;
}

export interface AppModalProps {
  modal: AppModal & AppTags;
  notes: AppNotes;
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
}

export interface AppTags {
    basicTags: string[];
    customTags: string[];
}

export interface AppTagsActions {
   addCustomTag(tag: string): AppActionTags;
   deleteCustomTag(tag: string): AppActionTags;
}