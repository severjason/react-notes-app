import { AppAction } from '../../interfaces';

export interface AppActionCategory extends AppAction {
  payload: {category: string, uuid?: string};
}

export interface AppCategoriesActions {
  toggleCategories(): AppAction;
  activateCategory(category: string): AppActionCategory;
  deleteCategory(category: string): AppActionCategory;
  addCategory(category: string, uuid: string): AppActionCategory;
}

export interface AppCategories {
  activated: string;
  categoriesList: string[];
  expanded: boolean;
  loaded?: boolean;
}
