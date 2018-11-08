import * as types from '../redux/types';
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { getFirebase } from 'react-redux-firebase';
import { CATEGORIES_COLLECTION } from '../../../constants';
import { AppActionCategory } from '../interfaces';

function* addCategory(action: AppActionCategory) {
  try {
    const { uuid, category } = action.payload;
    yield call([getFirebase().firestore().collection(CATEGORIES_COLLECTION), 'add'], {name: category, uuid});
    yield put({
      type: types.ADD_CATEGORY_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: types.ADD_CATEGORY_FAILED,
    });
  }
}

function* deleteCategory(action: AppActionCategory) {
  try {
    const { id } = action.payload;
    yield call([getFirebase().firestore().collection(CATEGORIES_COLLECTION).doc(id), 'delete']);
    yield put({
      type: types.DELETE_CATEGORY_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_CATEGORY_FAILED,
    });
  }
}

function* categoriesSaga() {
  yield all([
    yield takeLatest(types.ADD_CATEGORY_REQUEST, addCategory),
    yield takeLatest(types.DELETE_CATEGORY_REQUEST, deleteCategory),
  ]);
}

export default categoriesSaga;
