import * as types from '../redux/types';
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { getFirebase } from 'react-redux-firebase';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import { LOGIN_FORM_NAME } from '../../../constants';

export function* firebaseLogin(action: any) {
  try {
    yield put(startSubmit(LOGIN_FORM_NAME));
    const response = yield call(getFirebase().login, action.payload);
    yield put({
      type: types.USER_LOGIN_SUCCESS,
      payload: response,
    });
    yield put(stopSubmit(LOGIN_FORM_NAME));
    yield put(reset(LOGIN_FORM_NAME));
  } catch (error) {
    yield put({
      type: types.USER_LOGIN_FAILED,
      payload: error,
    });
    if (error.code.includes('email')) {
      // @ts-ignore
      yield put(stopSubmit(LOGIN_FORM_NAME, {email: error.message}));
    } else if (error.code.includes('password')) {
      // @ts-ignore
      yield put(stopSubmit(LOGIN_FORM_NAME, {password: error.message}));
    } else {
      // @ts-ignore
      yield put(stopSubmit(LOGIN_FORM_NAME, {_error: error.message}));
    }

  }
}

export function* firebaseLogout() {
  try {
    const response = yield call(getFirebase().logout);
    yield put({
      type: types.USER_LOGOUT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: types.USER_LOGOUT_FAILED,
      payload: error,
    });
  }
}

function* authSaga() {
  yield all([
    yield takeLatest(types.USER_LOGIN_REQUEST, firebaseLogin),
    yield takeLatest(types.USER_LOGOUT_REQUEST, firebaseLogout),
  ]);
}

export default authSaga;
