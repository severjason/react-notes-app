import { AppAction, AppCategories, AppNote } from '../../interfaces';

export interface AppModalProps {
  modal: AppModal;
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
