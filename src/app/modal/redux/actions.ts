import * as types from './types';
import { AppAction } from '../../interfaces';

export const openModal = (): AppAction => ({
  type: types.OPEN_MODAL,
});

export const closeModal = (): AppAction => ({
  type: types.CLOSE_MODAL,
});

export const openModalForUpdate = (noteId: string): AppAction => ({
  type: types.OPEN_MODAL_FOR_UPDATE,
  id: noteId,
});
