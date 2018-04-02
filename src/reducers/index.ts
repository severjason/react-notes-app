import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import { AppState } from '../interfaces';

const rootReducer = combineReducers<AppState>({
    notes: notesReducer,
});

export default rootReducer;
