import asyncHandler from 'express-async-handler';
import {Request,Response,NextFunction} from 'express';
import { findCommentById } from '../services/comment';
import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';
import { StatusCodes } from 'http-status-codes';
import { getReactionById, reactComment, unreactComment, updateReactComment } from '../services/commentReaction';
import { Emojis } from '@prisma/client';


const addCommentReactionHandler=asyncHandler(async(req:Request<{commentId:string},{},{emoji:string}>&{user:any},res:Response,next:NextFunction)=>{
    let reaction;
    const comment=await findCommentById(req.params.commentId);
    if(!comment) {
        return next(new ErrorResponse(errorMessages.notFound,StatusCodes.NOT_FOUND));
    }
    const myReaction= comment.reactions.find(item=>item.user.id===req.user.id);
    if(myReaction) {
        reaction = await updateReactComment(myReaction.id,req.body.emoji as Emojis);
    }else{
        reaction=await reactComment(req.params.commentId,req.body.emoji as Emojis,req.user.id);
    }
    return res.status(StatusCodes.CREATED).json({success:true,data:reaction,status:myReaction?'update':'create',reactionId:myReaction?.id})
})


const unreactCommentReactionHandler=asyncHandler(async(req:Request<{reactionId:string}>,res:Response,next:NextFunction)=>{
    const reaction=await getReactionById(req.params.reactionId);
    if(!reaction) {
        return next(new ErrorResponse(errorMessages.notFound,StatusCodes.NOT_FOUND));
    }
    await unreactComment(req.params.reactionId);
    return res.status(StatusCodes.OK).json({success:true,reactionId:reaction.id});
})

export {addCommentReactionHandler,unreactCommentReactionHandler};

