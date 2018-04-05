import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import modalReducer from './modalReducer';
import categoriesReducer from './categoriesReducer';
import { AppState } from '../interfaces';

const rootReducer = combineReducers<AppState>({
    notes: notesReducer,
    modal: modalReducer,
    categories: categoriesReducer,
});

export default rootReducer;
