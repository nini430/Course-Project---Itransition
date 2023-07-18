import asyncHandler from 'express-async-handler'
import {Request,Response,NextFunction} from 'express'
import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';
import { StatusCodes } from 'http-status-codes';


const ownerPermission=asyncHandler(async(req:Request<{},{},{ownerId:string}> & {user:any,ownerId:string},res:Response,next:NextFunction)=>{
    let ownerId;
    if(req.body.ownerId === req.user.id) {
        ownerId=req.user.id;
    }else if(req.user.role==='ADMIN' && req.body.ownerId !== req.user.id ) {
        ownerId= req.body.ownerId;
    }else{
        return next(new ErrorResponse(errorMessages.forbiddenOperation,StatusCodes.FORBIDDEN));
    }
    req.ownerId=ownerId;
    next();
})

export default ownerPermission;