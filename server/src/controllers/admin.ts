import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import {Request,Response,NextFunction} from 'express'
import { editUser, filterUsers, getAllUsers } from "../services/admin";
import { findUserById } from "../services/auth";
import { RegisterInput } from "../types/auth";
import ErrorResponse from "../utils/errorResponse";
import errorMessages from "../utils/errorMessages";


const getAllUsersHandler=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
     const users=await getAllUsers();
     return res.status(StatusCodes.OK).json({success:true,data:users});
});

const filterUsersHandler= asyncHandler(async(req:Request<{},{},{filter:string}>,res:Response,next:NextFunction)=>{
     const filteredUsers= await filterUsers(req.body.filter);
     return res.status(StatusCodes.OK).json({success:true,data:filteredUsers});

})

const editUserHandler=asyncHandler(async(req:Request<{userId:string},{},{inputs:RegisterInput}>,res:Response,next:NextFunction)=>{
     const user=await findUserById(req.params.userId);
     if(!user) {
          return next(new ErrorResponse(errorMessages.notFound,StatusCodes.NOT_FOUND));
     }
     const updatedUser= await editUser(req.params.userId,req.body.inputs,user.password);
     return res.status(StatusCodes.OK).json({success:true,data:updatedUser});
})


export {getAllUsersHandler,filterUsersHandler,editUserHandler};


