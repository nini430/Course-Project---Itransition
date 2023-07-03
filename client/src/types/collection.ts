import { SimpleUser, User } from "./auth";

export interface CollectionInitialState {
  collectionTopics: string[];
  topicsLoading: boolean;
  addCollectionLoading: boolean;
  getLargestCollectionsLoading: boolean;
  largestCollections: Collection[] | null;
  myCollections: Collection[] | null;
  getMyCollectionsLoading: boolean;
  removeCollectionLoading: boolean;
  currentCollection: ExtendedCollection | null;
  getCollectionLoading: boolean;
  uploadCollectionImageLoading:boolean;
}

export interface Collection {
  id: string;
  name: string;
  topic: string;
  image?: string;
  description: string;
  createdAt:string;
  updatedAt:string;
  author:SimpleUser
}

export type ExtendedCollection = Collection & {
  items:any;
  author:User;
}

export interface CollectionValues {
  name: string;
  description: string;
  topic: string;
  image?: string;
}
