import { all, spawn } from 'redux-saga/effects';
import authSaga from '../app/auth/redux/saga';
import categoriesSaga from '../app/nav/redux/saga';

function* rootSaga() {
  yield all([
    spawn(authSaga),
    spawn(categoriesSaga),
  ]);
}

export default rootSaga;
