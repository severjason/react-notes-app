import * as types from '../redux/types';
import { call, put, all, takeLatest, take } from 'redux-saga/effects';
// import { eventChannel } from 'redux-saga';
import { getFirebase } from 'react-redux-firebase';
import { NOTES_COLLECTION } from '../../../constants';
import { AppActionNote } from '../interfaces';
import { eventChannel } from 'redux-saga';

function getFirestore() {
  return getFirebase().firestore();
}

function fetchCollection(collection: string) {
  return getFirestore().collection(collection);
}

function createEventChannel(noteId: string) {
  return eventChannel((emit: any) => {
    fetchCollection(NOTES_COLLECTION).doc(noteId).onSnapshot(
      (doc: any) => {
        if (doc.data()) {
          emit(doc.data());
        } else {
          emit(false);
        }
      },
      (error: any) => emit(null, error));
    return () => {};
  });
}

function* getNote(action: AppActionNote) {
  try {
    const channel = yield call(createEventChannel, action.payload);
    while (true) {
        const data = yield take(channel);
        yield put({
          type: types.GET_NOTE_SUCCESS,
          payload: data ? {
            ...data,
            id: action.payload,
          } : null,
        });
    }

  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_NOTE_FAILED,
    });
  }
}

function* addNote(action: AppActionNote) {
  try {
    yield call([fetchCollection(NOTES_COLLECTION), 'add'], {...action.payload});
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
    yield call([fetchCollection(NOTES_COLLECTION).doc(id), 'update'], {expanded});
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
    yield createEventChannel(action.payload).close();
    yield call([fetchCollection(NOTES_COLLECTION).doc(action.payload), 'delete']);
    yield put({
      type: types.DELETE_NOTE_SUCCESS,
    });
  } catch (error) {
    console.log(error);
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
