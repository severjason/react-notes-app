import * as types from '../redux/types';
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { getFirebase } from 'react-redux-firebase';
import { CATEGORIES_COLLECTION } from '../../../constants';

function* fetchCategories() {
  try {
    const response: any = yield call([getFirebase().firestore().collection(CATEGORIES_COLLECTION), 'get']);
    response.forEach((doc: any) => {
      console.log(`${doc.id} => ${doc.data().name}`);
    });
    yield put({
      type: types.FETCH_CATEGORIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_CATEGORIES_FAILED,
    });
  }
}

function* categoriesSaga() {
  yield all([
    yield takeLatest(types.FETCH_CATEGORIES_REQUEST, fetchCategories),
  ]);
}

export default categoriesSaga;
