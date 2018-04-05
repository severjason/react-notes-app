// import { types } from '../constants/types';
import { AppAction, AppCategories } from '../interfaces';

const INITIAL_STATE: AppCategories = {
    active: 'All',
    categoriesList: ['All', 'Work', 'Private', 'Health']
};

export default function categoriesReducer(state: AppCategories = INITIAL_STATE, action: AppAction) {
    switch (action.type) {
        default: {
            return state;
        }
    }
}
