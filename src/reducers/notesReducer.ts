import { types } from '../constants/types';
import { AppAction, AppNote } from '../interfaces';

const INITIAL_STATE: AppNote[] = [
    {
        id: '1',
        title: 'First note',
        categories: [''],
        color: 'red',
        tags: [''],
        text: 'some textdsadsa afasd asdas ads asdasdas asd ad asd',
        expanded: true,
    },
    {
        id: '2',
        title: 'Second note',
        categories: [''],
        color: 'black',
        tags: [''],
        text: 'some text 2',
        expanded: true,
    },
    {
        id: '3',
        title: 'Third note',
        categories: [''],
        color: 'yellow',
        tags: [''],
        text: 'some text 3',
        expanded: false,
    }
];

export default function notesReducer(state: AppNote[] = INITIAL_STATE, action: AppAction) {
    switch (action.type) {
        case types.notes.GET_NOTES: {
            return state;
        }
        case types.notes.TOGGLE_NOTE: {
            return state.map((note: AppNote) => {
                note.expanded = (note.id === action.id) ? !note.expanded : note.expanded;
                return note;
            });
        }
        case types.notes.DELETE_NOTE: {
            return state.filter((note: AppNote) => note.id !== action.id);
        }
        default: {
            return state;
        }
    }
}
