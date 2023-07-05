import {Request,Response,NextFunction} from 'express'
import {StatusCodes} from 'http-status-codes'
import asyncHandler from 'express-async-handler'
import ErrorResponse from '../utils/errorResponse'
import errorMessages from '../utils/errorMessages'

const adminProtect=asyncHandler(async(req:Request & {user:any},res:Response,next:NextFunction)=>{
     if(req.user.role!=='ADMIN') {
        return next(new ErrorResponse(errorMessages.forbiddenOperation,StatusCodes.FORBIDDEN));
     }
     next();
});

export default adminProtect;