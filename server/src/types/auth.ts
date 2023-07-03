export interface RegisterInput {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export type UserUpdateInput=Partial<RegisterInput> & {newPassword?:string};

export type UpdateTypes='fullName'|'email'|'password';

export interface LoginInput {
    email:string;
    password:string;
}


export interface SimpleUser {
    firstName:string;
    lastName:string;
    profileImage?:string;
    id:string;
}

