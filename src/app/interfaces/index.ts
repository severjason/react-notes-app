import { AppNote, AppNoteActions, AppActionNote, AppNotes, AppNotesState } from '../note/interfaces';
import { AppModal, AppModalActions } from '../modal/interfaces';
import {
  AppCategories,
  AppNavActions,
  AppNavAction,
  AppCategory,
} from '../nav/interfaces';
import { RouteComponentProps, RouteProps } from 'react-router';
import * as React from 'react';

export interface AppAction {
  type: string;
  id?: string;
}

export interface AppState {
  notes: AppNotesState;
  modal: AppModal;
  categories: AppCategories;
}

export interface HomeProps {
  notes: AppNote[];
  notesAreLoaded?: boolean;
  categories: AppCategories;
  error?: any;
}

export interface HomePropsWithFirebase extends HomeProps {
  categories: AppCategories;
}

export interface AppRoute {
  match: any;
}

export interface AppWithFirebaseAuthProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  firebaseUser: {
    auth: any;
    profile: any;
    isAuthReady: boolean;
    isAuthEmpty: boolean;
  };
  firestore?: any;
}

interface AppFirestore {
  firestore: any;
}

export interface AppAllActions extends AppNoteActions, AppNavActions, AppModalActions {
}

export {
  AppNote,
  AppNotes,
  AppNotesState,
  AppCategories,
  AppModal,
  AppModalActions,
  AppActionNote,
  AppNavAction,
  AppFirestore,
  AppCategory,
};
