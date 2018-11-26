import { AppNote, AppNoteActions, AppActionNote, AppNotes, AppNotesState } from '../note/interfaces';
import { AppModal, AppModalActions } from '../modal/interfaces';
import {
  AppCategories,
  AppNavActions,
  AppNavAction,
  AppCategory, AppTagsState,
} from '../nav/interfaces';
import { RouteComponentProps, RouteProps } from 'react-router';
import * as React from 'react';

export interface AppAction {
  type: string;
  id?: string;
  payload?: any;
}

export interface AppState {
  notes: AppNotesState;
  modal: AppModal;
  categories: AppCategories;
  tags: AppTagsState;
}

export interface HomeProps {
  notes: AppNote[];
  notesAreLoaded?: boolean;
  categories: AppCategories;
  tags: AppTagsState;
  error?: any;
}

export interface HomePropsWithFirebase {
  categories: AppCategories;
  notes: AppNote[];
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
