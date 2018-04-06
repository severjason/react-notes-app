import { types } from '../constants/types';
import { AppAction, AppNoteModal } from '../interfaces';

const INITIAL_STATE: AppNoteModal = {
    opened: true,
    openedForUpdate: false,
    modalProps: {},
};

export default function modalReducer(state: AppNoteModal = INITIAL_STATE, action: AppAction) {
    switch (action.type) {
        case types.modal.OPEN_MODAL: {
            return {
                ...state,
                opened: true,
            };
        }
        case types.modal.OPEN_MODAL_FOR_UPDATE: {
            return {
                opened: true,
                openedForUpdate: true,
                modalProps: action.modalProps,
            };
        }
        case types.modal.CLOSE_MODAL: {
            return {
                opened: false,
                openedForUpdate: false,
                modalProps: {},
            };
        }
        default: {
            return state;
        }
    }
}
