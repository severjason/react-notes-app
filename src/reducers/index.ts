import { combineReducers } from 'redux';
import notesReducer        from './notesReducer';
import modalReducer        from '../app/Modal/redux/reducer';
import categoriesReducer   from './categoriesReducer';
// import { AppState }        from '../interfaces';

const rootReducer = combineReducers<any>({
    notes: notesReducer,
    modal: modalReducer,
    categories: categoriesReducer,
});

export default rootReducer;
