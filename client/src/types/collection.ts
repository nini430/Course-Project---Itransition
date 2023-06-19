export interface CollectionInitialState {
    collectionTopics:string[]
    topicsLoading:boolean
    addCollectionLoading:boolean;
    getLargestCollectionsLoading:boolean;
    largestCollections:Collection[] | null
}

export interface Collection {
    id:string;
    name:string;
    topic:string
    image?:string;
    description:string;
}

export interface CollectionValues {
    name:string;
    description:string;
    topic:string;
    image?:string;
}