import { AppAction } from './index';

export interface AppActionCategory extends AppAction {
    category: string;
}

export interface AppCategoriesActions {
    toggleCategories(): AppAction;
    activateCategory(category: string): AppActionCategory;
    deleteCategory(category: string): AppActionCategory;
    addCategory(category: string): AppActionCategory;
}

export interface AppCategories {
    activated: string;
    categoriesList: string[];
    expanded: boolean;
}
