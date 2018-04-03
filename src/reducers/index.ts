import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import modalReducer from './modalReducer';
import { AppState } from '../interfaces';

const rootReducer = combineReducers<AppState>({
    notes: notesReducer,
    modals: modalReducer,
});

export default rootReducer;
