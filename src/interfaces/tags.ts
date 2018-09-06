import { AppAction } from "./index";

export interface AppActionTags extends AppAction {
    tag: string;
}

export interface AppTags {
    basicTags: string[];
    customTags: string[];
}

export interface AppTagsActions {
   addCustomTag(tag: string): AppActionTags;
   deleteCustomTag(tag: string): AppActionTags;
}