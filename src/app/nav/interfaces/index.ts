import { AppAction } from '../../interfaces';

export interface AppNavAction extends AppAction {
  payload: {
    id?: string;
    category?: string;
    tags?: AppTag[];
    uid?: string;
  };
}

export interface AppNavActions {
  getCategories(uid: string): AppNavAction;
  getTags(uid: string): AppNavAction;
  toggleCategories(): AppAction;
  activateCategory(category: AppCategory): AppNavAction;
  deleteCategory(category: string): AppNavAction;
  addCategory(category: string, uid: string): AppNavAction;
}

export interface AppCategory {
  id: string;
  name: string;
  uid?: string;
}

export interface AppTag {
  id: string;
  name: string;
  uid: string;
}

export interface AppCategories {
  activated: AppCategory | null;
  categoriesList: AppCategory[];
  tags: AppTag[];
  expanded: boolean;
  loaded?: boolean;
}
