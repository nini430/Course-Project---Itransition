
export interface User {
    id:string;
    firstName:string;
    lastName:string;
    email:string;
}

export interface AuthInitialState {
    authedUser: null | User;
    registerLoading: boolean;
    loginLoading: boolean;
}