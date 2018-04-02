import { types } from '../constants/types';
import { AppAction } from '../interfaces';

export const getNotes = (): AppAction => ({
    type: types.GET_NOTES,
});
