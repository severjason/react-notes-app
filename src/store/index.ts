import { applyMiddleware, createStore, Store, compose } from 'redux';
import rootReducer                             from '../reducers';
import thunkMiddleware                         from 'redux-thunk';
import { AppState }                            from '../app/interfaces';
import { composeWithDevTools }                 from 'redux-devtools-extension';
import * as firebase from 'firebase/app';
import { reactReduxFirebase } from 'react-redux-firebase';

import { FirebaseConfig } from '../config/keys';

const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

firebase.initializeApp(FirebaseConfig);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  // reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

export const store: Store<AppState> = createStoreWithFirebase(
  rootReducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
  )));
