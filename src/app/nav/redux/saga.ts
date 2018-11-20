import * as types from '../redux/types';
import { call, put, all, takeLatest, take } from 'redux-saga/effects';
import { CATEGORIES_COLLECTION, TAGS_COLLECTION } from '../../../constants';
import { AppNavAction } from '../interfaces';
import { eventChannel } from 'redux-saga';
import { fetchCollection } from '../../../helpers/firebase';

function createChannel(uid: string, collection: string) {
  return uid && eventChannel((emit: any) => {
    fetchCollection(collection).where('uid', '==', uid).onSnapshot(
      (querySnapshot: any) => {
        const array: any = [];
        querySnapshot.forEach((doc: any) => {
          array.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        emit(array);
      },
      (error: any) => emit(false, error));
    return () => {};
  });
}

function* getCategories(action: AppNavAction) {
  try {
    const {uid} = action.payload;
    const channel = yield call(createChannel, uid, CATEGORIES_COLLECTION);
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

function* getTags(action: AppNavAction) {
  try {
    const {uid} = action.payload;
    const channel = yield call(createChannel, uid, TAGS_COLLECTION);
    while (true) {
      const data = yield take(channel);
      console.log(data);
      yield put({
        type: types.GET_TAGS_SUCCESS,
        payload: data ? data : null,
      });
    }

  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_TAGS_FAILED,
      payload: error,
    });
  }
}

function* addCategory(action: AppNavAction) {
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

function* deleteCategory(action: AppNavAction) {
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
    yield takeLatest(types.GET_TAGS_REQUEST, getTags),
    yield takeLatest(types.GET_CATEGORIES_REQUEST, getCategories),
    yield takeLatest(types.ADD_CATEGORY_REQUEST, addCategory),
    yield takeLatest(types.DELETE_CATEGORY_REQUEST, deleteCategory),
  ]);
}

export default categoriesSaga;
