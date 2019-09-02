import { createSelector } from 'reselect';
import { AppState } from '../../interfaces';
import { filterCategories } from '../../../helpers';
import { AppCategories } from '../interfaces';

const getCategoriesState = (state: AppState) => state.categories;

export const getFilteredCategories = createSelector(getCategoriesState, (categories: AppCategories) => {
  return {
    ...categories,
    categoriesList: filterCategories(categories.categoriesList),
  };
});
