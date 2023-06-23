import asynHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes'
import {Request,Response,NextFunction} from 'express'
import { getUserById } from '../services/user';
import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';


const getUserByIdHandler=asynHandler(async(req:Request<{userId:string}>,res:Response,next:NextFunction)=>{
    const user=await getUserById(req.params.userId);
    if(!user) {
        return next(new ErrorResponse(errorMessages.notFound,StatusCodes.NOT_FOUND));
    }
    return res.status(StatusCodes.OK).json({success:true,data:user});
})

export {getUserByIdHandler}