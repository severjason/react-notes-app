import { types } from '../constants/types';
import { AppAction, AppActionNote, AppActionTags, AppNote } from '../interfaces';

const INITIAL_STATE: AppNote[] = [
    {
        id: '1',
        title: 'First note',
        categories: ['work'],
        color: 'red',
        tags: [],
        text: 'First node text',
        expanded: true,
    },
    {
        id: '2',
        title: 'Second note',
        categories: [''],
        color: 'black',
        tags: [],
        text: 'First node text',
        expanded: true,
    },
    {
        id: '3',
        title: 'Third note',
        categories: ['work'],
        color: 'yellow',
        tags: [],
        text: 'Third node text',
        expanded: false,
    }
];

export default function notesReducer(state: AppNote[] = INITIAL_STATE,
                                     action: AppAction & AppActionNote & AppActionTags) {
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
        case types.notes.ADD_NOTE: {
            return state.concat(action.note);
        }
        case types.notes.UPDATE_NOTE: {
            const noteIndex: number = state.findIndex((n: AppNote) => n.id === action.note.id);
            return [
                ...state.slice(0, noteIndex),
                action.note,
                ...state.slice(noteIndex + 1, state.length),
            ];
        }
        case types.tags.DELETE_CUSTOM_TAG: {
            return state.map((note: AppNote) => {
                return {
                    ...note,
                    tags: note.tags.filter((tag: string) => tag !== action.tag),
                };
            });
        }
        default: {
            return state;
        }
    }
}
