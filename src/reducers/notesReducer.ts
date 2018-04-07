import { types } from '../constants/types';
import { AppAction, AppActionCategory, AppActionNote, AppActionTags, AppNote } from '../interfaces';

const INITIAL_STATE: AppNote[] = [
    {
        id: '1',
        title: 'First note',
        categories: ['work', 'health'],
        color: 'red',
        tags: ['important'],
        text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of ' +
        'classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin ' +
        'professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ' +
        'consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical ' +
        'literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 ' +
        'of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. ' +
        'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first ' +
        'line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n' +
        '\n' +
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ' +
        'Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced ' +
        'in their exact original form, accompanied by English versions from the 1914 translation by H. ' +
        'Rackham.',
        expanded: true,
    },
    {
        id: '2',
        title: 'Second note',
        categories: ['work', 'private'],
        color: 'black',
        tags: ['personal', 'interesting'],
        text: 'First node text',
        expanded: true,
    },
    {
        id: '3',
        title: 'Third note',
        categories: ['private', 'health'],
        color: 'green',
        tags: ['favourite', 'later', 'important'],
        text: 'some text',
        expanded: false,
    }
];

export default function notesReducer(state: AppNote[] = INITIAL_STATE,
                                     action: AppAction & AppActionNote & AppActionTags & AppActionCategory) {
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
        case types.categories.DELETE_CATEGORY: {
            return state.map((note: AppNote) => {
                return {
                    ...note,
                    categories: note.categories.filter((c: string) => c !== action.category),
                };
            });
        }
        default: {
            return state;
        }
    }
}
