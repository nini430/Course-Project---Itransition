import { AccountStatuses } from "./common";
import { FollowInstance } from "./follow";
import { RegisterValues } from "./register";

type Role='BASIC' | 'ADMIN';


export interface User {
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    profileImage:string;
    accountStatus:AccountStatuses;
    role:Role;
    followedIds:FollowInstance[];
    followerIds: FollowInstance[];
    
}

export interface AuthInitialState {
    authedUser: null | User;
    registerLoading: boolean;
    loginLoading: boolean;
    profileUploadLoading:boolean;
    updateProfileLoading:boolean;
    myFollowers:FollowInstance[];
    myFollowings: FollowInstance[];
}


export interface SimpleUser {
    firstName:string;
    lastName:string;
    profileImage:string;
    id:string;
}

export type UserUpdateInput=Partial<RegisterValues> & {newPassword?:string};

export type UpdateTypes='fullName'|'email'|'password';