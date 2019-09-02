import { AppAction } from '../../interfaces';
import { AppCategories, AppTagsState } from '../../nav/interfaces';
import { AppNote } from '../../note/interfaces';

export interface AppModalProps {
  modal: AppModal;
  categories: AppCategories;
  tags: AppTagsState;
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
