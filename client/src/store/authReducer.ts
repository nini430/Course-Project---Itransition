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

const initialState: AuthInitialState = {
  authedUser: null,
  registerLoading: false,
  loginLoading: false,
  profileUploadLoading: false,
  updateProfileLoading: false,
  myFollowers: [],
  myFollowings: [],
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
      const response = await axiosApiInstance.get<{data:{
        followers: FollowInstance[];
        followings: FollowInstance[];
      }}>(apiUrls.auth.getFollows);
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
      toast.error(action.payload.message.error, toastOptions);
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
      toast.error(action.payload.message.error, toastOptions);
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
        localStorage.setItem(
          'authed_user',
          JSON.stringify(state.authedUser)
        );
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
      toast.error(action.payload.message.error as string, toastOptions);
    });
    builder.addCase(getFollows.fulfilled, (state, action) => {
      console.log(action.payload)
      state.myFollowers = action.payload.followers;
      state.myFollowings = action.payload.followings;
    });
    builder.addCase(toggleFollow.fulfilled,(state,action)=>{
      const {data,status,follow}=action.payload;
      if(status==='follow') {
        state.myFollowings=[...state.myFollowings,data];
      }else{
        state.myFollowings=state.myFollowings.filter(item=>item.id!==follow);
      }
    })
  },
});

export const { clearUser, setAuthedUser } = authReducer.actions;

export default authReducer.reducer;
