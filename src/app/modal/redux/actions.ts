import * as types from './types';
import { AppAction, AppActionTags } from '../../interfaces';

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

export const addCustomTag = (tag: string): AppActionTags => ({
  type: types.ADD_CUSTOM_TAG,
  tag: tag,
});

export const deleteCustomTag = (tag: string): AppActionTags => ({
  type: types.DELETE_CUSTOM_TAG,
  tag: tag,
});
