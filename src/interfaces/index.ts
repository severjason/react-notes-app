import { AppNote, AppNoteActions, AppActionNote, AppNotes, AppNotesState } from './notes';
import { AppTags, AppTagsActions, AppActionTags } from './tags';
import { AppCategories, AppCategoriesActions, AppActionCategory } from './categories';
import { AppModal, AppModalActions } from './modal';

export interface AppAction {
  type: string;
  id?: string;
  modalProps?: AppNote;
}

export interface AppState {
  notes: AppNotesState;
  modal: AppModal;
  categories: AppCategories;
  tags: AppTags;
}

export interface HomeProps {
  notes: AppNote[];
  categories: AppCategories;
}

export interface NoteProps {
  notes: AppNotes;
  activeCategory: string;
}

export interface AppModalProps {
  modal: AppModal;
  categories: AppCategories;
  tags: AppTags;
}

export interface AppRoute {
  match: any;
}

export interface AppAllActions extends AppNoteActions, AppTagsActions, AppCategoriesActions, AppModalActions {
}

export {
  AppNote,
  AppNotes,
  AppNotesState,
  AppTags,
  AppCategories,
  AppModal,
  AppActionNote,
  AppActionCategory,
  AppActionTags,
};
