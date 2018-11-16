import { AppAction } from '../../interfaces';

export interface AppActionCategory extends AppAction {
  payload: {
    id?: string;
    category?: string,
    uid?: string
  };
}

export interface AppCategoriesActions {
  getCategories(uid: string): AppActionCategory;
  toggleCategories(): AppAction;
  activateCategory(category: AppCategory): AppActionCategory;
  deleteCategory(category: string): AppActionCategory;
  addCategory(category: string, uid: string): AppActionCategory;
}

export interface AppCategory {
  id: string;
  name: string;
  uid?: string;
}

export interface AppCategories {
  activated: AppCategory | null;
  categoriesList: AppCategory[];
  expanded: boolean;
  loaded?: boolean;
}
