import { combineReducers } from 'redux';
import notesReducer from '../app/note/redux/reducer';
import modalReducer from '../app/modal/redux/reducer';
import categoriesReducer from '../app/nav/redux/reducer';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers<any>({
  notes: notesReducer,
  modal: modalReducer,
  categories: categoriesReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
