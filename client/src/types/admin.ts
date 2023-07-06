import { SimpleUser } from "./auth";
import { Collection } from "./collection";

export interface AdminFormattedUser  {
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    status:{status:true,data:string},
    role:'user'|'admin',
    profileImage:{foreign:true,data:{src:string|undefined,fallbackSrc:'avatar'}},
    collections:{count:true,data:Collection[],name:'collection'},
    createdAt:{date:true,data:string},
    followers:{count:true,data:SimpleUser[],name:'follow'},
    followings:{count:true,data:SimpleUser[],name:'follow'},
    view:{action:true,data:'view',link:string},
    edit:{action:true,data:'Edit',name:'edit',link:string}
}

export interface AdminInitialState {
    getUsersLoading:boolean;
    editUserLoading:boolean;
    changeStatusLoading:boolean;
    addUserLoading:boolean;
    users: AdminFormattedUser[] | null
}