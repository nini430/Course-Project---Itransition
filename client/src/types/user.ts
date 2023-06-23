import { User } from "./auth";

export interface UserInitialState {
    currentProfile: null | User;
    profileLoading:boolean;
}

