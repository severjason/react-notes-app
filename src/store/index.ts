import { applyMiddleware, createStore, Store } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { AppState } from '../interfaces';

/*const persistConfig = {
    key: 'notesApp',
    storage: storage,
    stateReconciler: autoMergeLevel2
};*/

const loggerMiddleware = createLogger();

// const persistAppReducer = persistReducer(persistConfig, rootReducer);

export const store: Store<AppState> = createStore(
    /* persistAppReducer*/
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));
// export const persistor = persistStore(store);
