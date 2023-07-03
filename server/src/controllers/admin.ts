import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import {Request,Response,NextFunction} from 'express'
import { getAllUsers } from "../services/admin";


const getAllUsersHandler=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
     const users=await getAllUsers();
     return res.status(StatusCodes.OK).json({success:true,data:users});
});


export {getAllUsersHandler};


