import { AppAction } from '../../interfaces';

export interface AppActionCategory extends AppAction {
  payload: {
    id?: string;
    category?: string,
    uuid?: string
  };
}

export interface AppCategoriesActions {
  toggleCategories(): AppAction;
  activateCategory(category: AppCategory): AppActionCategory;
  deleteCategory(category: string): AppActionCategory;
  addCategory(category: string, uuid: string): AppActionCategory;
}

export interface AppCategory {
  id: string;
  name: string;
  uuid?: string;
}

export interface AppCategoriesFirebase {
  categoriesList: AppCategory[];
}

export interface AppCategories {
  activated: AppCategory;
  expanded: boolean;
  loaded?: boolean;
}
