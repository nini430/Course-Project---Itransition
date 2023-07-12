import { AccountStatuses, Statuses } from './common';
import { FollowInstance } from './follow';
import { RegisterValues } from './register';

type Role = 'BASIC' | 'ADMIN';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  isEmailVerified: boolean;
  accountStatus: AccountStatuses;
  role: Role;
  followedIds: FollowInstance[];
  followerIds: FollowInstance[];
  createdAt: Date;
  updatedAt: Date;
  githubId: string | null;
  googleId: string | null;
  social: string | null;
  status: Statuses;
}

export interface AuthInitialState {
  authedUser: null | User;
  registerLoading: boolean;
  loginLoading: boolean;
  profileUploadLoading: boolean;
  updateProfileLoading: boolean;
  myFollowers: FollowInstance[];
  myFollowings: FollowInstance[];
  forgetPasswordLoading: boolean;
  resetPasswordLoading: boolean;
  resetPasswordPageLoading: boolean;
  verifyEmailLoading: boolean;
  verifyEmailActionLoading: boolean;
}

export interface SimpleUser {
  firstName: string;
  lastName: string;
  profileImage: string;
  id: string;
}

export type UserUpdateInput = Partial<RegisterValues> & {
  newPassword?: string;
};

export type UpdateTypes = 'fullName' | 'email' | 'password';
