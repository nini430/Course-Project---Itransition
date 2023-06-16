import {toast} from 'react-hot-toast'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthInitialState, User } from '../types/auth';
import { RegisterValues } from '../types/register';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';
import toastOptions from '../utils/toastOptions';
import { LoginValues } from '../types/login';


const initialState: AuthInitialState = {
  authedUser:null,
  registerLoading: false,
  loginLoading: false,
};



export const registerUser = createAsyncThunk(
  '/auth/register',
  async ({
    input,
    onSuccess,
  }: {
    input: RegisterValues;
    onSuccess: VoidFunction;
  },thunkApi) => {
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

export const loginUser= createAsyncThunk('/auth/login',async({input,onSuccess}:{input:LoginValues,onSuccess:VoidFunction},thunkApi)=>{
    try{
      const response=await axiosApiInstance.post<{user:User}>(apiUrls.auth.login,input);
      onSuccess && onSuccess();
      return response.data.user;
    }catch(err) {
      return thunkApi.rejectWithValue(err);
    }
})

export const generateRefreshToken=createAsyncThunk('auth/refresh-token',async(_,thunkApi)=>{
   try{
    const response=await axiosApiInstance.post(apiUrls.auth.refreshToken);
    return response.data;
   }catch(err) {
    return thunkApi.rejectWithValue(err);
   }
});

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser(state) {
      state.authedUser=null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.registerLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action:any) => {
      state.registerLoading = false;
      toast.error(action.payload.message.error,toastOptions)
    });
    builder.addCase(loginUser.pending,(state)=>{
      state.loginLoading=true;
    });
    builder.addCase(loginUser.fulfilled,(state,action)=>{
      state.loginLoading=false;
      state.authedUser=action.payload;
    });
    builder.addCase(loginUser.rejected,(state,action:any)=>{
      state.loginLoading=false;
      toast.error(action.payload.message.error,toastOptions);
    });
  },
});

export const {clearUser}=authReducer.actions;

export default authReducer.reducer;
