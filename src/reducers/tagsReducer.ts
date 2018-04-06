import { AppActionTags, AppTags } from '../interfaces';
import { types } from '../constants/types';
import * as helpers from '../helpers';

const INITIAL_STATE: AppTags = {
    basicTags: ['favourite', 'personal', 'interesting', 'later', 'important'],
    customTags: [],
};

export default function tagsReducer(state: AppTags = INITIAL_STATE, action: AppActionTags) {
    switch (action.type) {
        case types.tags.ADD_CUSTOM_TAG: {
            const customTagsArray = (!state.basicTags.includes(action.tag))
                ? helpers.concatArrayUnique(state.customTags, [action.tag])
                : state.customTags;
            return {
                ...state,
                customTags: customTagsArray,
            };
        }
        case types.tags.DELETE_CUSTOM_TAG: {
            return {
                ...state,
                customTags: state.customTags.filter((t: string) => t !== action.tag),
            };
        }
        default: {
            return state;
        }
    }
}
