import { all, spawn } from 'redux-saga/effects';
import authSaga from '../app/auth/redux/saga';
import categoriesSaga from '../app/nav/redux/saga';
import notesSaga from '../app/note/redux/saga';

function* rootSaga() {
  yield all([
    spawn(authSaga),
    spawn(categoriesSaga),
    spawn(notesSaga),
  ]);
}

export default rootSaga;
