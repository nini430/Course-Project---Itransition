import { toast } from 'react-hot-toast';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  AuthInitialState,
  UpdateTypes,
  User,
  UserUpdateInput,
} from '../types/auth';
import { RegisterValues } from '../types/register';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';
import toastOptions from '../utils/toastOptions';
import { LoginValues } from '../types/login';
import { FollowInstance } from '../types/follow';
import { toggleFollow } from './userReducer';
import i18n from '../utils/i18next';

const initialState: AuthInitialState = {
  authedUser: JSON.parse(localStorage.getItem('authed_user') as string) || null,
  registerLoading: false,
  loginLoading: false,
  profileUploadLoading: false,
  updateProfileLoading: false,
  myFollowers: [],
  myFollowings: [],
  forgetPasswordLoading: false,
  resetPasswordPageLoading: false,
  resetPasswordLoading: false,
  verifyEmailLoading: false,
  verifyEmailActionLoading: false,
};

export const registerUser = createAsyncThunk(
  '/auth/register',
  async (
    {
      input,
      onSuccess,
    }: {
      input: RegisterValues;
      onSuccess: VoidFunction;
    },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post(
        apiUrls.auth.register,
        input
      );
      onSuccess && onSuccess();
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  '/auth/login',
  async (
    { input, onSuccess }: { input: LoginValues; onSuccess: VoidFunction },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post<{ user: User }>(
        apiUrls.auth.login,
        input
      );
      onSuccess && onSuccess();
      return response.data.user;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const generateRefreshToken = createAsyncThunk(
  'auth/refresh-token',
  async (_, thunkApi) => {
    try {
      const response = await axiosApiInstance.post(apiUrls.auth.refreshToken);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      const response = await axiosApiInstance.get(apiUrls.auth.logout);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  'auth/upload',
  async (
    { image, onSuccess }: { image: string; onSuccess: VoidFunction },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.put<{ data: any }>(
        apiUrls.auth.profileImageUpload,
        { image }
      );
      onSuccess && onSuccess();
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'auth/update',
  async (
    {
      update,
      input,
      onSuccess,
    }: {
      update: UpdateTypes;
      input: UserUpdateInput;
      onSuccess: (param: string) => void;
    },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.put<{ data: User }>(
        apiUrls.auth.userInfoUpdate,
        { update, input }
      );
      console.log(response.data);
      onSuccess && onSuccess(update);
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getFollows = createAsyncThunk(
  'auth/getFollows',
  async (_, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{
        data: {
          followers: FollowInstance[];
          followings: FollowInstance[];
        };
      }>(apiUrls.auth.getFollows);
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (
    {
      email,
      onSuccess,
    }: { email: string; onSuccess: (message: string) => void },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.put<{ data: string }>(
        apiUrls.auth.forgotPassword,
        { email }
      );
      onSuccess && onSuccess(response.data.data);
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async (
    {
      userId,
      token,
      onSuccess,
    }: {
      userId: string;
      token: string;
      onSuccess: (isExpire: boolean) => void;
    },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.put<{ expired: boolean }>(
        `${apiUrls.auth.resetPassword}/${userId}`,
        { token }
      );
      onSuccess && onSuccess(response.data.expired);
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const resetPasswordAction = createAsyncThunk(
  'auth/reset-password-action',
  async (
    {
      userId,
      newPassword,
      onSuccess,
    }: {
      userId: string;
      newPassword: string;
      onSuccess: (message: string) => void;
    },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.put<{ data: string }>(
        `${apiUrls.auth.resetPasswordAction}/${userId}`,
        { newPassword }
      );
      onSuccess && onSuccess(response.data.data);
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verify-email',
  async (
    { userId, onSuccess }: { userId: string; onSuccess: VoidFunction },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.put<{ data: string }>(
        `${apiUrls.auth.verifyEmail}/${userId}`
      );
      onSuccess && onSuccess();
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const verifyEmailAction = createAsyncThunk(
  'auth/verify-email-action',
  async (
    {
      userId,
      token,
      onSuccess,
    }: {
      userId: string;
      token: string;
      onSuccess: (isExpired: boolean) => void;
    },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.put<{ data: boolean }>(
        `${apiUrls.auth.verifyEmailAction}/${userId}`,
        { token }
      );
      onSuccess && onSuccess(response.data.data);
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getMyPassportUser = createAsyncThunk(
  'auth/my-passport-user',
  async ({ onSuccess }: { onSuccess: VoidFunction }, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{ data: any }>(
        `${apiUrls.auth.getMyPassportUser}`
      );
      onSuccess && onSuccess();
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser(state) {
      state.authedUser = null;
    },
    setAuthedUser(state, action) {
      state.authedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.registerLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action: any) => {
      state.registerLoading = false;
      toast.error(
        `${i18n.t(
          `errors.${action.payload.message.error || 'something_went_wrong'}`
        )}`,
        toastOptions
      );
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.authedUser = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.loginLoading = false;
      toast.error(
        `${i18n.t(
          `errors.${action.payload.message.error || 'something_went_wrong'}`
        )}`,
        toastOptions
      );
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.authedUser = null;
    });
    builder.addCase(uploadProfileImage.pending, (state) => {
      state.profileUploadLoading = true;
    });
    builder.addCase(uploadProfileImage.fulfilled, (state, action) => {
      state.profileUploadLoading = false;
      if (state.authedUser) {
        state.authedUser = {
          ...state.authedUser,
          profileImage: action.payload,
        };
        localStorage.setItem('authed_user', JSON.stringify(state.authedUser));
      }
    });
    builder.addCase(uploadProfileImage.rejected, (state, action) => {
      state.profileUploadLoading = false;
    });
    builder.addCase(updateUserInfo.pending, (state) => {
      state.updateProfileLoading = true;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.updateProfileLoading = false;
      state.authedUser = action.payload;
      localStorage.setItem('authed_user', JSON.stringify(state.authedUser));
    });
    builder.addCase(updateUserInfo.rejected, (state, action: any) => {
      state.updateProfileLoading = false;
      toast.error(
        `${i18n.t(
          `errors.${action.payload.message.error || 'something_went_wrong'}`
        )}`,
        toastOptions
      );
    });
    builder.addCase(getFollows.fulfilled, (state, action) => {
      console.log(action.payload);
      state.myFollowers = action.payload.followers;
      state.myFollowings = action.payload.followings;
    });
    builder.addCase(toggleFollow.fulfilled, (state, action) => {
      const { data, status, follow } = action.payload;
      if (status === 'follow') {
        state.myFollowings = [...state.myFollowings, data];
      } else {
        state.myFollowings = state.myFollowings.filter(
          (item) => item.id !== follow
        );
      }
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.forgetPasswordLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.forgetPasswordLoading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action: any) => {
      state.forgetPasswordLoading = false;
      toast.error(
        `${i18n.t(
          `errors.${action.payload.message.error || 'something_went_wrong'}`
        )}`,
        toastOptions
      );
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.resetPasswordPageLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.resetPasswordPageLoading = false;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.resetPasswordPageLoading = false;
    });
    builder.addCase(resetPasswordAction.pending, (state) => {
      state.resetPasswordLoading = true;
    });
    builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
      state.resetPasswordLoading = false;
    });
    builder.addCase(resetPasswordAction.rejected, (state, action) => {
      state.resetPasswordLoading = false;
    });
    builder.addCase(verifyEmail.pending, (state) => {
      state.verifyEmailLoading = true;
    });
    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      state.verifyEmailLoading = false;
    });
    builder.addCase(verifyEmail.rejected, (state, action: any) => {
      state.verifyEmailLoading = false;
      toast.error(
        `${i18n.t(
          `errors.${action.payload.message.error || 'something_went_wrong'}`
        )}`,
        toastOptions
      );
    });
    builder.addCase(verifyEmailAction.pending, (state) => {
      state.verifyEmailActionLoading = true;
    });
    builder.addCase(verifyEmailAction.fulfilled, (state, action) => {
      state.verifyEmailActionLoading = false;
      if (state.authedUser && !action.payload) {
        state.authedUser = { ...state.authedUser, isEmailVerified: true };
        localStorage.setItem('authed_user', JSON.stringify(state.authedUser));
      }
    });
    builder.addCase(verifyEmailAction.rejected, (state, action) => {
      state.verifyEmailActionLoading = false;
    });
    builder.addCase(getMyPassportUser.fulfilled, (state, action) => {
      state.authedUser = action.payload;
      localStorage.setItem('authed_user', JSON.stringify(state.authedUser));
    });
  },
});

export const { clearUser, setAuthedUser } = authReducer.actions;

export default authReducer.reducer;
