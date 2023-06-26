import { User } from "./auth";

export interface CommentInput {
    text:string;
}

export interface Comment {
    id:string;
    text:string;
    itemId:string;
    createdAt: string;
    updatedAt: string;
    author:User
}