import { types }                   from '../actions/types';
import { AppAction, AppModal } from '../interfaces';

const INITIAL_STATE: AppModal = {
    opened: false,
    openedForUpdate: false,
    modalProps: {},
};

export default function modalReducer(state: AppModal = INITIAL_STATE, action: AppAction) {
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
