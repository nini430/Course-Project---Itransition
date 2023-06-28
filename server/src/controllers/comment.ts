import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CommentInput } from '../types/comment';
import { addComment, editComment, findCommentById, removeComment } from '../services/comment';
import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';

const addCommentHandler = asyncHandler(
  async (
    req: Request<{ itemId: string }, {}, { input: CommentInput } > & {user:any},
    res: Response,
    next: NextFunction
  ) => {
    const { input } = req.body;
    const newComment = await addComment(
      { text: input.text, image:input.image },
      req.params.itemId,
      req.user.id
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: newComment });
  }
);

const removeCommentHandler=asyncHandler(async(req:Request<{commentId:string}>,res:Response,next:NextFunction)=>{
    const comment=await findCommentById(req.params.commentId);
    if(!comment) {
      return next(new ErrorResponse(errorMessages.notFound,StatusCodes.NOT_FOUND));
    }
    await removeComment(req.params.commentId);
    return res.status(StatusCodes.OK).json({success:true,data:'comment_deleted'});
})


const editCommentHandler=asyncHandler(async(req:Request<{commentId:string},{},{input:CommentInput}>,res:Response,next:NextFunction)=>{
    const {input}=req.body;
    const comment=await findCommentById(req.params.commentId);
    if(!comment) {
      return next(new ErrorResponse(errorMessages.notFound,StatusCodes.NOT_FOUND));
    }
    const updatedComment=await editComment(req.params.commentId,{text:input.text});
    return res.status(StatusCodes.OK).json({success:true,data:updatedComment});
})

export { addCommentHandler, removeCommentHandler, editCommentHandler };
