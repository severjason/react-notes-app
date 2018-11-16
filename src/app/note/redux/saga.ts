import * as types from '../redux/types';
import { call, put, all, takeLatest, take } from 'redux-saga/effects';
import { NOTES_COLLECTION } from '../../../constants';
import { AppActionNote } from '../interfaces';
import { eventChannel } from 'redux-saga';
import { fetchCollection } from '../../../helpers/firebase';

function createAllNotesChannel(uid: string) {
  return uid && eventChannel((emit: any) => {
    fetchCollection(NOTES_COLLECTION).where('uid', '==', uid).onSnapshot(
      (querySnapshot: any) => {
        const notes: any = [];
        querySnapshot.forEach((doc: any) => {
          notes.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        emit(notes);
      },
      (error: any) => emit(false, error));
    return () => {
    };
  });
}

function createNoteChannel(noteId: string) {
  return noteId && eventChannel((emit: any) => {
    fetchCollection(NOTES_COLLECTION).doc(noteId).onSnapshot(
      (doc: any) => {
        if (doc.data()) {
          emit(doc.data());
        } else {
          emit(false);
        }
      },
      (error: any) => emit(false, error));
    return () => {
    };
  });
}

function* getAllNotes(action: AppActionNote) {
  try {
    const channel = yield call(createAllNotesChannel, action.payload);
    while (true) {
      const data = yield take(channel);
      if (data) {
        yield put({
          type: types.GET_ALL_NOTES_SUCCESS,
          payload: data,
        });
      }
    }

  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_ALL_NOTES_FAILED,
      payload: error,
    });
  }
}

function* getNote(action: AppActionNote) {
  try {

    const channel = yield call(createNoteChannel, action.payload);
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
      payload: error,
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
    // yield createNoteChannel(action.payload).close();
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
    yield takeLatest(types.GET_ALL_NOTES_REQUEST, getAllNotes),
    yield takeLatest(types.GET_NOTE_REQUEST, getNote),
    yield takeLatest(types.ADD_NOTE_REQUEST, addNote),
    yield takeLatest(types.TOGGLE_NOTE_REQUEST, toggleNote),
    yield takeLatest(types.DELETE_NOTE_REQUEST, deleteNote),
  ]);
}

export default notesSaga;
