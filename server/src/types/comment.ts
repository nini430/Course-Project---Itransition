export interface CommentInput {
    text:string;
    image?:{
        value:string| undefined,
        name:string;
    };
}

export interface SimpleCommentInput {
    text:string;
    image?:string;
}