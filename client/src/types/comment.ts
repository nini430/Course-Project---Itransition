import { User } from "./auth";
import { CommentReaction } from "./reaction";

export interface CommentInput {
    text:string;
    image?:{
        value:string | undefined,
        name:string;
    };
}

export interface SimpleCommentInput {
    text:string;
    image?:string;
}

export interface Comment {
    id:string;
    text:string;
    itemId:string;
    createdAt: string;
    updatedAt: string;
    author:User
    reactions:CommentReaction[]
    image?:string;
}