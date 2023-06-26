import { CommentInput } from '../types/comment';
import client from '../utils/prismaClient';

const addComment = async(input: CommentInput, itemId: string,authorId:string) => {
    const {text}=input;
    const comment=await client.comment.create({data:{text,itemId,authorId},include:{author:{select:{firstName:true,lastName:true,profileImage:true,id:true}}}});
    return comment;
};

export { addComment };
