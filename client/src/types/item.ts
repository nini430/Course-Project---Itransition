export interface ItemInitialState {
    addItemLoading:boolean,
    initializeFormLoading:boolean;
    formCustomFields:any;
    getItemTagsLoading:boolean;
    itemTags:string[];
    latestItems:Item[]  | null;
    getLatestItemsLoading:boolean;
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
}