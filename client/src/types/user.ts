import { User } from "./auth";

export interface UserInitialState {
    currentProfile: null | User;
    profileLoading:boolean;
    currentFollowers:User[];
    currentFollowings:User[]
}


