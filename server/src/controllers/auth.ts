import {Request,Response,NextFunction} from 'express'
import {StatusCodes} from 'http-status-codes'
import asyncHandler from 'express-async-handler'
import { createUser } from '../services/auth';
import { RegisterInput } from '../types/auth';
import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';

const registerUser=asyncHandler(async(req:Request<{},{},RegisterInput>,res:Response,next:NextFunction)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName || !email || !password) {
        return next(new ErrorResponse(errorMessages.missingFields,StatusCodes.BAD_REQUEST));
    }
    const {password:pass,...rest}=await createUser({
        firstName,lastName,email,password
    });
    return res.status(StatusCodes.CREATED).json({success:true,user:rest})   
})

export {registerUser};