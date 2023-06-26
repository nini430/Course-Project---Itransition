import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CommentInput } from '../types/comment';
import { addComment } from '../services/comment';

const addCommentHandler = asyncHandler(
  async (
    req: Request<{ itemId: string }, {}, { input: CommentInput } > & {user:any},
    res: Response,
    next: NextFunction
  ) => {
    const { input } = req.body;
    const newComment = await addComment(
      { text: input.text },
      req.params.itemId,
      req.user.id
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: newComment });
  }
);


export { addCommentHandler };
