import { applyMiddleware, createStore, Store, compose } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { AppState } from '../app/interfaces';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { reactReduxFirebase } from 'react-redux-firebase';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

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

const store: Store<AppState> = createStoreWithFirebase(
  rootReducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    sagaMiddleware,
  )));

sagaMiddleware.run(rootSaga);

export default store;
