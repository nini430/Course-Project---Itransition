import asyncHandler from 'express-async-handler'
import {Request,Response,NextFunction} from 'express'
import {StatusCodes} from 'http-status-codes'
import { COLLECTION_TOPICS } from '../utils/constants';

const getCollectionTopics=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    return res.status(StatusCodes.OK).json({success:true,data:COLLECTION_TOPICS})
});

export {getCollectionTopics};