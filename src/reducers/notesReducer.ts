import { types } from '../constants/types';
import { AppAction, AppNote } from '../interfaces';

const INITIAL_STATE: AppNote[] = [
    {
        id: 1,
        title: 'First note',
        categories: [''],
        color: '',
        tags: [''],
        text: 'some text',
    },
    {
        id: 2,
        title: 'Second note',
        categories: [''],
        color: '',
        tags: [''],
        text: 'some text 2',
    }
];

export default function notesReducer(state: AppNote[] = INITIAL_STATE, action: AppAction) {
    switch (action.type) {
        case types.GET_NOTES: {
            return state;
        }
        default: {
            return state;
        }
    }
}
