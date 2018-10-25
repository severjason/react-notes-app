import * as types from '../redux/types';
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { getFirebase } from 'react-redux-firebase';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import { loginForm } from '../../../constants';

export function* firebaseLogin(action: any) {
  try {
    yield put(startSubmit(loginForm));
    const response = yield call(getFirebase().login, action.payload);
    yield put({
      type: types.USER_LOGIN_SUCCESS,
      payload: response,
    });
    yield put(stopSubmit(loginForm));
    yield put(reset(loginForm));
  } catch (error) {
    yield put({
      type: types.USER_LOGIN_FAILED,
      payload: error,
    });
    if (error.code.includes('email')) {
      // @ts-ignore
      yield put(stopSubmit(loginForm, {email: error.message}));
    } else if (error.code.includes('password')) {
      // @ts-ignore
      yield put(stopSubmit(loginForm, {password: error.message}));
    } else {
      // @ts-ignore
      yield put(stopSubmit(loginForm, {_error: error.message}));
    }

  }
}

function* authSaga() {
  yield all([
    yield takeLatest(types.USER_LOGIN_REQUEST, firebaseLogin),
  ]);
}

export default authSaga;
