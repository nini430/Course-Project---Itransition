import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import {Request,Response,NextFunction} from 'express'
import { filterUsers, getAllUsers } from "../services/admin";


const getAllUsersHandler=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
     const users=await getAllUsers();
     return res.status(StatusCodes.OK).json({success:true,data:users});
});

const filterUsersHandler= asyncHandler(async(req:Request<{},{},{filter:string}>,res:Response,next:NextFunction)=>{
     const filteredUsers= await filterUsers(req.body.filter);
     return res.status(StatusCodes.OK).json({success:true,data:filteredUsers});

})


export {getAllUsersHandler,filterUsersHandler};


