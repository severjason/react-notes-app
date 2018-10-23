import { combineReducers } from 'redux';
import notesReducer        from '../app/Note/redux/reducer';
import modalReducer        from '../app/Modal/redux/reducer';
import categoriesReducer   from '../app/Nav/redux/reducer';
// import { AppState }        from '../interfaces';

const rootReducer = combineReducers<any>({
    notes: notesReducer,
    modal: modalReducer,
    categories: categoriesReducer,
});

export default rootReducer;
