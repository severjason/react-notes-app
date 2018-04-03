import { types } from '../constants/types';
import { AppAction } from '../interfaces';

export default function modalReducer(state: any = null, action: AppAction) {
    switch (action.type) {
        case types.modal.OPEN_MODAL: {
            return {
                modalProps: action.payload,
            };
        }
        case types.modal.CLOSE_MODAL: {
            return {};
        }
        default: {
            return state;
        }
    }
}
