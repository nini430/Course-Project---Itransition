import { User } from "./auth";

export interface Reaction {
    id:string;
    name:string;
    userId:string;
    user:User
}

export interface ItemReaction extends Reaction {
    itemId: string;
}
export interface CommentReaction extends Reaction {
    commentId: string;
}

export interface ReactionMapper {
    id:string;
    emoji:string;
    user:User;

}