import { applyMiddleware, createStore, Store, compose } from 'redux';
import rootReducer from '../reducers';
import { AppState } from '../app/interfaces';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

import { FirebaseConfig } from '../config/keys';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  logErrors: false,
};

firebase.initializeApp(FirebaseConfig);
const settings = {timestampsInSnapshots: true};
firebase.firestore().settings(settings);

const store: Store<AppState> = createStore(
  rootReducer,
  composeWithDevTools(compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
    applyMiddleware(sagaMiddleware)
  )));

sagaMiddleware.run(rootSaga);

export default store;
