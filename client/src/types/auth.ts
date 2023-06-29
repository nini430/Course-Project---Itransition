import { RegisterValues } from "./register";

type Role='BASIC' | 'ADMIN';


export interface User {
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    profileImage:string;
    role:Role;
    
}

export interface AuthInitialState {
    authedUser: null | User;
    registerLoading: boolean;
    loginLoading: boolean;
    profileUploadLoading:boolean;
    updateProfileLoading:boolean;
}

export type UserUpdateInput=Partial<RegisterValues> & {newPassword?:string};

export type UpdateTypes='fullName'|'email'|'password';