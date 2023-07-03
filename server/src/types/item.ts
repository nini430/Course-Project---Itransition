import { Collection } from "./collection";
import { ItemReaction } from "./itemReaction";

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
    createdAt:Date;
    updatedAt:Date;
    reactions: ItemReaction[];
    comments: Comment[];

}
