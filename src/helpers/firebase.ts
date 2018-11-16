import { getFirebase } from 'react-redux-firebase';

function getFirestore() {
  return getFirebase().firestore();
}

export function fetchCollection(collection: string) {
  return getFirestore().collection(collection);
}
