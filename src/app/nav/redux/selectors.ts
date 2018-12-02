import { createSelector } from 'reselect';
import { AppCategories, AppState } from '../../interfaces';
import { filterCategories } from '../../../helpers';

const getCategoriesState = (state: AppState) => state.categories;

export const getFilteredCategories = createSelector(getCategoriesState, (categories: AppCategories) => {
  return {
    ...categories,
    categoriesList: filterCategories(categories.categoriesList),
  };
});
