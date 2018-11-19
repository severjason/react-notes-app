import * as types from '../redux/types';
import { call, put, all, takeLatest, take } from 'redux-saga/effects';
import { CATEGORIES_COLLECTION } from '../../../constants';
import { AppActionCategory } from '../interfaces';
import { eventChannel } from 'redux-saga';
import { fetchCollection } from '../../../helpers/firebase';

function createCategoriesChannel(uid: string) {
  return uid && eventChannel((emit: any) => {
    fetchCollection(CATEGORIES_COLLECTION).where('uid', '==', uid).onSnapshot(
      (querySnapshot: any) => {
        const categories: any = [];
        querySnapshot.forEach((doc: any) => {
          categories.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        emit(categories);
      },
      (error: any) => emit(false, error));
    return () => {};
  });
}

function* getCategories(action: AppActionCategory) {
  try {
    const {uid} = action.payload;
    const channel = yield call(createCategoriesChannel, uid);
    while (true) {
      const data = yield take(channel);
      yield put({
        type: types.GET_CATEGORIES_SUCCESS,
        payload: data ? data : null,
      });
    }

  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_CATEGORIES_FAILED,
      payload: error,
    });
  }
}

function* addCategory(action: AppActionCategory) {
  try {
    const { uid, category } = action.payload;
    yield call([fetchCollection(CATEGORIES_COLLECTION), 'add'], {name: category, uid});
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
    yield call([fetchCollection(CATEGORIES_COLLECTION).doc(id), 'delete']);
    yield put({
      type: types.DELETE_CATEGORY_SUCCESS,
      payload: id,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_CATEGORY_FAILED,
    });
  }
}

function* categoriesSaga() {
  yield all([
    yield takeLatest(types.GET_CATEGORIES_REQUEST, getCategories),
    yield takeLatest(types.ADD_CATEGORY_REQUEST, addCategory),
    yield takeLatest(types.DELETE_CATEGORY_REQUEST, deleteCategory),
  ]);
}

export default categoriesSaga;
