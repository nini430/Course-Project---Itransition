export interface CollectionInitialState {
    collectionTopics:string[]
    topicsLoading:boolean
    addCollectionLoading:boolean
}

export interface CollectionValues {
    name:string;
    description:string;
    topic:string;
    image?:string;
}