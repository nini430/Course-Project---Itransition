import { User } from "./auth";
import { Collection} from "./collection";
import { Comment } from "./comment";
import { ItemReaction, Reaction, ReactionMapper } from "./reaction";

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
    removeItemLoading:boolean;
    addCommentLoading:boolean;
    editItemLoading:boolean;
    removeCommentLoading:boolean;
    editCommentLoading:boolean;
    myItems:Item[];
    getMyItemsLoading:boolean;
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
    reactions: ItemReaction[];
    comments: Comment[];
    collection:Collection
    
}

export interface ExtendedItem extends Item {
    collection:Collection  & {author: User};
    comments:Comment[];
}