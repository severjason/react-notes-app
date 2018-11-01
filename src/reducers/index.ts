import { combineReducers } from 'redux';
import notesReducer from '../app/note/redux/reducer';
import modalReducer from '../app/modal/redux/reducer';
import categoriesReducer from '../app/nav/redux/reducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers<any>({
  notes: notesReducer,
  modal: modalReducer,
  categories: categoriesReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: formReducer,
});

export default rootReducer;
