import * as types from '../redux/types';
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { getFirebase } from 'react-redux-firebase';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import { LOGIN_FORM_NAME, SIGNUP_FORM_NAME } from '../../../constants';
import { AppAuthAction, AppSocialAuthAction } from '../interfaces';

const loginSagaCreator = (successType: string, errorType: string) =>
  function* loginSaga(action: AppAuthAction & AppSocialAuthAction) {
    try {
      yield put(startSubmit(LOGIN_FORM_NAME));
      const response = yield call(getFirebase().login, action.payload);
      yield put({
        type: successType,
        payload: response,
      });
      yield put(stopSubmit(LOGIN_FORM_NAME));
      yield put(reset(LOGIN_FORM_NAME));
    } catch (error) {
      yield put({
        type: errorType,
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
};

const firebaseLogin = loginSagaCreator(
  types.USER_LOGIN_SUCCESS,
  types.USER_LOGIN_FAILED,
);

const firebaseGoogleAuth = loginSagaCreator(
  types.GOOGLE_LOGIN_SUCCESS,
  types.GOOGLE_LOGIN_FAILED,
);

const firebaseGithubAuth = loginSagaCreator(
  types.GITHUB_LOGIN_SUCCESS,
  types.GITHUB_LOGIN_FAILED,
);

export function* firebaseSignup(action: AppAuthAction) {
  try {
    yield put(startSubmit(SIGNUP_FORM_NAME));
    const {email, username, password} = action.payload;
    const response = yield call(getFirebase().createUser, { email, password },  { username, email });
    yield put({
      type: types.USER_SIGNUP_SUCCESS,
      payload: response,
    });
    yield put(stopSubmit(SIGNUP_FORM_NAME));
    yield put(reset(SIGNUP_FORM_NAME));
  } catch (error) {
    yield put({
      type: types.USER_SIGNUP_FAILED,
      payload: error,
    });
    if (error.code.includes('email')) {
      // @ts-ignore
      yield put(stopSubmit(SIGNUP_FORM_NAME, {email: error.message}));
    } else if (error.code.includes('password')) {
      // @ts-ignore
      yield put(stopSubmit(SIGNUP_FORM_NAME, {password: error.message}));
    } else {
      // @ts-ignore
      yield put(stopSubmit(SIGNUP_FORM_NAME, {_error: error.message}));
    }

  }
}

function* firebaseLogout() {
  try {
    yield call(getFirebase().logout);
    yield put({
      type: types.USER_LOGOUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: types.USER_LOGOUT_FAILED,
    });
  }
}

function* authSaga() {
  yield all([
    yield takeLatest(types.USER_LOGIN_REQUEST, firebaseLogin),
    yield takeLatest(types.USER_SIGNUP_REQUEST, firebaseSignup),
    yield takeLatest(types.GOOGLE_LOGIN_REQUEST, firebaseGoogleAuth),
    yield takeLatest(types.GITHUB_LOGIN_REQUEST, firebaseGithubAuth),
    yield takeLatest(types.USER_LOGOUT_REQUEST, firebaseLogout),
  ]);
}

export default authSaga;
