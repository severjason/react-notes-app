import * as types from '../redux/types';
import { call, put, all, takeLatest, take } from 'redux-saga/effects';
import { CATEGORIES_COLLECTION, TAGS_COLLECTION } from '../../../constants';
import { AppNavAction } from '../interfaces';
import { eventChannel } from 'redux-saga';
import { fetchCollection } from '../../../helpers/firebase';
import { AppAction } from '../../interfaces';

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

function* getCategories(action: AppAction) {
  try {
    const channel = yield call(createChannel, action.payload, CATEGORIES_COLLECTION);
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
function* getCustomTags(action: AppAction) {
  try {
    const customTagsChannel = yield call(createChannel, action.payload, TAGS_COLLECTION);
    while (true) {
      const customTags = yield take(customTagsChannel);
      yield put({
        type: types.GET_CUSTOM_TAGS_SUCCESS,
        payload: customTags ? customTags : null,
      });
    }

  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_CUSTOM_TAGS_FAILED,
      payload: error,
    });
  }
}

function* getBasicTags() {
  try {
    const basicTagsChannel = yield call(createChannel, 'all', TAGS_COLLECTION);
    while (true) {
      const basicTags = yield take(basicTagsChannel);
      yield put({
        type: types.GET_BASIC_TAGS_SUCCESS,
        payload: basicTags ? basicTags : null,
      });
    }

  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_BASIC_TAGS_FAILED,
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
    console.log(error);
    yield put({
      type: types.ADD_CATEGORY_FAILED,
      payload: error,
    });
  }
}

function* addTag(action: AppAction) {
  try {
    yield call([fetchCollection(TAGS_COLLECTION), 'add'], action.payload);
    yield put({
      type: types.ADD_TAG_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.ADD_TAG_FAILED,
      payload: error,
    });
  }
}

function* deleteTag(action: AppAction) {
  try {
    yield call([fetchCollection(TAGS_COLLECTION).doc(action.payload), 'delete']);
    yield put({
      type: types.DELETE_TAG_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_TAG_FAILED,
      payload: error,
    });
  }
}

function* deleteCategory(action: AppAction) {
  try {
    yield call([fetchCollection(CATEGORIES_COLLECTION).doc(action.payload), 'delete']);
    yield put({
      type: types.DELETE_CATEGORY_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_CATEGORY_FAILED,
      payload: error,
    });
  }
}

function* categoriesSaga() {
  yield all([
    yield takeLatest(types.DELETE_TAG_REQUEST, deleteTag),
    yield takeLatest(types.ADD_TAG_REQUEST, addTag),
    yield takeLatest(types.GET_TAGS_REQUEST, getBasicTags),
    yield takeLatest(types.GET_TAGS_REQUEST, getCustomTags),
    yield takeLatest(types.GET_CATEGORIES_REQUEST, getCategories),
    yield takeLatest(types.ADD_CATEGORY_REQUEST, addCategory),
    yield takeLatest(types.DELETE_CATEGORY_REQUEST, deleteCategory),
  ]);
}

export default categoriesSaga;
