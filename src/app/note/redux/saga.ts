import * as types from '../redux/types';
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { getFirebase } from 'react-redux-firebase';
import { NOTES_COLLECTION } from '../../../constants';
import { AppActionNote } from '../interfaces';

function* getNote(action: AppActionNote) {
  try {
    const response = yield call([getFirebase().firestore().collection(NOTES_COLLECTION).doc(action.payload), 'get']);
    if (response.exists) {
      yield put({
        type: types.GET_NOTE_SUCCESS,
        payload: response.data(),
      });
    } else {
      yield put({
        type: types.GET_NOTE_FAILED,
      });
    }

  } catch (error) {
    yield put({
      type: types.GET_NOTE_FAILED,
    });
  }
}

function* addNote(action: AppActionNote) {
  try {
    yield call([getFirebase().firestore().collection(NOTES_COLLECTION), 'add'], {...action.payload});
    yield put({
      type: types.ADD_NOTE_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: types.ADD_NOTE_FAILED,
    });
  }
}

function* toggleNote(action: AppActionNote) {
  try {
    const {id, expanded} = action.payload;
    yield call([getFirebase().firestore().collection(NOTES_COLLECTION).doc(id), 'update'], {expanded});
    yield put({
      type: types.TOGGLE_NOTE_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: types.TOGGLE_NOTE_FAILED,
    });
  }
}

function* deleteNote(action: AppActionNote) {
  try {
    yield call([getFirebase().firestore().collection(NOTES_COLLECTION).doc(action.payload), 'delete']);
    yield put({
      type: types.DELETE_NOTE_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_NOTE_FAILED,
    });
  }
}

function* notesSaga() {
  yield all([
    yield takeLatest(types.GET_NOTE_REQUEST, getNote),
    yield takeLatest(types.ADD_NOTE_REQUEST, addNote),
    yield takeLatest(types.TOGGLE_NOTE_REQUEST, toggleNote),
    yield takeLatest(types.DELETE_NOTE_REQUEST, deleteNote),
  ]);
}

export default notesSaga;
