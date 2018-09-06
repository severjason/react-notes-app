import { combineReducers } from 'redux';
import notesReducer        from './notesReducer';
import modalReducer        from './modalReducer';
import categoriesReducer   from './categoriesReducer';
import tagsReducer         from './tagsReducer';
import { AppState }        from '../interfaces';

const rootReducer = combineReducers<AppState>({
    notes: notesReducer,
    modal: modalReducer,
    categories: categoriesReducer,
    tags: tagsReducer,
});

export default rootReducer;
