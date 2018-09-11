import { AppNote, AppNoteActions, AppActionNote } from './notes';
import { AppTags, AppTagsActions, AppActionTags } from './tags';
import { AppCategories, AppCategoriesActions, AppActionCategory } from './categories';
import { AppModal, AppModalActions } from './modal';

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

export interface HomeProps {
  notes: AppNote[];
  categories: AppCategories;
}

export interface NoteProps {
  notes: AppNote[];
  activeCategory: string;
}

export interface AppRoute {
  match: any;
}

export interface AppAllActions extends AppNoteActions, AppTagsActions, AppCategoriesActions, AppModalActions {
}

export {
  AppNote,
  AppTags,
  AppCategories,
  AppModal,
  AppActionNote,
  AppActionCategory,
  AppActionTags,
};
