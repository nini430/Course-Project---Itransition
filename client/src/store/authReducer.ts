import { toast } from 'react-hot-toast';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthInitialState, User } from '../types/auth';
import { RegisterValues } from '../types/register';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';
import toastOptions from '../utils/toastOptions';
import { LoginValues } from '../types/login';
import { Collection } from '../types/collection';

const initialState: AuthInitialState = {
  authedUser: null,
  registerLoading: false,
  loginLoading: false,
  myCollections: null,
  profileLoading: false,
  profileUploadLoading:false
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

export const getUserInformation = createAsyncThunk(
  'auth/userInfo',
  async (_, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{
        data: { collections: Collection[] };
      }>(apiUrls.auth.me);
      console.log(response.data);
      return response.data.data.collections;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const uploadProfileImage=createAsyncThunk('auth/upload',async({image,onSuccess}:{image:string,onSuccess:VoidFunction},thunkApi)=>{
  try{
    const response=await axiosApiInstance.put<{data:any}>(apiUrls.auth.profileImageUpload,{image});
    onSuccess && onSuccess();
    return response.data.data;
  }catch(err) {
    return thunkApi.rejectWithValue(err);
  }
})

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
    builder.addCase(getUserInformation.pending, (state) => {
      state.profileLoading = true;
    });
    builder.addCase(getUserInformation.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.myCollections = action.payload;
    });
    builder.addCase(getUserInformation.rejected, (state, action) => {
      state.profileLoading = false;
    });
    builder.addCase(uploadProfileImage.pending,state=>{
      state.profileUploadLoading=true;
    });
    builder.addCase(uploadProfileImage.fulfilled,(state,action)=>{
      state.profileUploadLoading=false;
      if(state.authedUser) {
        state.authedUser={...state.authedUser,profileImage:action.payload};
        localStorage.setItem('authed_user',JSON.stringify({...state.authedUser,profileImage:action.payload}));
      }
    });
    builder.addCase(uploadProfileImage.rejected,(state,action)=>{
      state.profileUploadLoading=false;
    })
  },
});

export const { clearUser, setAuthedUser } = authReducer.actions;

export default authReducer.reducer;
