import { all, spawn } from 'redux-saga/effects';
import authSaga from '../app/auth/redux/saga';

function* rootSaga() {
  yield all([
    spawn(authSaga)
  ]);
}

export default rootSaga;
