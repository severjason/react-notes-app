import { applyMiddleware, createStore, Store } from 'redux';
import rootReducer                             from '../reducers';
import thunkMiddleware                         from 'redux-thunk';
import { AppState }                            from '../app/interfaces';
import { composeWithDevTools }                 from 'redux-devtools-extension';

export const store: Store<AppState> = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
        thunkMiddleware,
    )));
