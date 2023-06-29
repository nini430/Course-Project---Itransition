import asynHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes'
import {Request,Response,NextFunction} from 'express'
import { doesAlreadyFollow, followUser, getUserById, unfollowUser } from '../services/user';
import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';


const getUserByIdHandler=asynHandler(async(req:Request<{userId:string}>,res:Response,next:NextFunction)=>{
    const user=await getUserById(req.params.userId);
    if(!user) {
        return next(new ErrorResponse(errorMessages.notFound,StatusCodes.NOT_FOUND));
    }
    return res.status(StatusCodes.OK).json({success:true,data:user});
})


const toggleFollowUser=asynHandler(async(req:Request<{followerId:string,followedId:string}>,res:Response,next:NextFunction)=>{
    let followInstance;
    const doesFollow=await doesAlreadyFollow(req.params.followerId,req.params.followedId);
    if(doesFollow) {
     await unfollowUser(doesFollow.id);
     followInstance=doesFollow;
    }else{
    followInstance=await followUser(req.params.followerId,req.params.followedId);
    }
    return res.status(StatusCodes.OK).json({success:true,data:followInstance,status:doesFollow?'unfollow':'follow'})
});

export {getUserByIdHandler,toggleFollowUser}