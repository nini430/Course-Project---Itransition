import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserInitialState } from '../types/user';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';
import { User } from '../types/auth';

const initialState: UserInitialState = {
  currentProfile: null,
  profileLoading: false,
  
};

export const getUserById = createAsyncThunk(
  'user/id',
  async (userId: string, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{ data: User }>(
        `${apiUrls.user.getUser}/${userId}`
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserById.pending, (state) => {
      state.profileLoading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.currentProfile = action.payload;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.profileLoading = false;
    });
  },
});

// export const {}=userSlice.actions;

export default userSlice.reducer;
