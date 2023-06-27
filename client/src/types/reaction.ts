export interface Reaction {
    id:string;
    name:string;
    userId:string;
}

export interface ItemReaction extends Reaction {
    itemId: string;
}
export interface CommentReaction extends Reaction {
    commentId: string;
}