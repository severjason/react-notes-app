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
  getCategories(uid: string): AppAction;
  getTags(uid: string): AppAction;
  addTag(tag: AppTag): AppAction;
  filterTag(tag: AppTag): AppAction;
  deleteCustomTag(id: string): AppAction;
  toggleCategories(): AppAction;
  activateCategory(category: AppCategory): AppNavAction;
  deleteCategory(id: string): AppAction;
  addCategory(category: string, uid: string): AppNavAction;
}

export interface AppCategory {
  id: string;
  name: string;
  uid?: string;
}

export interface AppTag {
  id?: string;
  name: string;
  uid?: string;
}

export interface AppCategories {
  activated: AppCategory | null;
  categoriesList: AppCategory[];
  basicTags: AppTag[];
  customTags: AppTag[];
  filteredTags: AppTag[];
  expanded: boolean;
  loaded?: boolean;
}
