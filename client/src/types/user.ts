import { User } from "./auth";
import { FollowInstance } from "./follow";

export interface UserInitialState {
    currentProfile: null | User;
    profileLoading:boolean;
    currentFollowers:FollowInstance[];
    currentFollowings:FollowInstance[];
    toggleFollowLoading:boolean;
}


