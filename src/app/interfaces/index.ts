import { AppNote, AppNoteActions, AppActionNote, AppNotes, AppNotesState } from '../Note/interfaces';
import { AppTags, AppTagsActions, AppActionTags, AppModal, AppModalActions } from '../Modal/interfaces';
import { AppCategories, AppCategoriesActions, AppActionCategory } from '../Nav/interfaces';

export interface AppAction {
  type: string;
  id?: string;
  modalProps?: AppNote;
}

export interface AppState {
  notes: AppNotesState;
  modal: AppModal & AppTags;
  categories: AppCategories;
}

export interface HomeProps {
  notes: AppNote[];
  categories: AppCategories;
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
  AppTagsActions,
  AppCategories,
  AppModal,
  AppModalActions,
  AppActionNote,
  AppActionCategory,
  AppActionTags,
};
