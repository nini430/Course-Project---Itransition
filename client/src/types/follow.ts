import { User } from "./auth";

export interface FollowInstance {
    id:string;
    followerId:string;
    followedId:string;
    followed?: User;
    follower?: User
}

