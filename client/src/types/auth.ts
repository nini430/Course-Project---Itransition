import { Collection } from "./collection";
type Role='BASIC' | 'ADMIN';


export interface User {
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    profileImage:string;
    role:Role
}

export interface AuthInitialState {
    authedUser: null | User;
    registerLoading: boolean;
    loginLoading: boolean;
    myCollections: null | Collection[];
    profileLoading:boolean;
    profileUploadLoading:boolean;
}