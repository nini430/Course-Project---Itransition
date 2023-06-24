import { User } from "./auth";
import { Collection} from "./collection";

export interface ItemInitialState {
    addItemLoading:boolean,
    initializeFormLoading:boolean;
    formCustomFields:any;
    getItemTagsLoading:boolean;
    itemTags:string[];
    latestItems:Item[]  | null;
    getLatestItemsLoading:boolean;
    getSingleItemLoading:boolean;
    currentItem: null | ExtendedItem;
}

export interface ItemInput {
    name:string;
    tags:string;
    customFieldValues:any;
}

export interface Item {
    id:string;
    name:string;
    tags:string;
    customFieldValues:any;
    collectionId:string;
    createdAt:string;
    updatedAt:string;
}

export interface ExtendedItem extends Item {
    collection:Collection  & {author: User}
}