import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { getItemByIdExtended } from '../services/item';
import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';
import { StatusCodes } from 'http-status-codes';
import { addReaction, getReactionById, unreactItem, updateReaction } from '../services/itemReaction';
import { Emojis } from '@prisma/client';

const addReactionHandler = asyncHandler(
  async (
    req: Request<{ itemId: string }, {}, { input: { name: string } }> & {
      user: any;
    },
    res: Response,
    next: NextFunction
  ) => {
    console.log('lalala')
    let reaction;
    const { name } = req.body.input;
    const item = await getItemByIdExtended(req.params.itemId);

    if (!item) {
      return next(
        new ErrorResponse(errorMessages.notFound, StatusCodes.NOT_FOUND)
      );
    }
    const myReaction = item.reactions.find(
      (item) => item.userId === req.user.id
    );
    if (myReaction) {
      reaction = await updateReaction(myReaction.id, name as Emojis);
    } else {
      reaction = await addReaction({
        name,
        itemId: req.params.itemId,
        userId: req.user.id,
      });
    }

    return res
      .status(StatusCodes.CREATED)
      .json({
        success: true,
        data: reaction,
        status: myReaction ? 'update' : 'create',
        reactionId:myReaction?.id as string|undefined
      });
  }
);

const unreactItemHandler=asyncHandler(async(req:Request<{reactionId:string}>,res:Response,next:NextFunction)=>{
     const itemReaction = await getReactionById(req.params.reactionId);
     if(!itemReaction) {
      return next(new ErrorResponse(errorMessages.notFound,StatusCodes.NOT_FOUND))
     }
     await unreactItem(itemReaction.id);
     return res.status(StatusCodes.OK).json({success:true,reactionId:itemReaction.id});

})

export { addReactionHandler, unreactItemHandler };
