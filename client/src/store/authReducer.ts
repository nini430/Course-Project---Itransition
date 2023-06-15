import {toast} from 'react-hot-toast'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthInitialState } from '../types/auth';
import { RegisterValues } from '../types/register';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';
import toastOptions from '../utils/toastOptions';


const initialState: AuthInitialState = {
  authedUser: null,
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
        return thunkApi.rejectWithValue(err);
    }
  }
);

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
  },
});

export default authReducer.reducer;
