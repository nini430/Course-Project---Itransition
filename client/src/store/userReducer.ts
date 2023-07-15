import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { UserInitialState } from '../types/user';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';
import { User } from '../types/auth';
import { FollowInstance } from '../types/follow';
import toastOptions from '../utils/toastOptions';
import { uploadProfileImage } from './authReducer';
import i18n from '../utils/i18next';

const initialState: UserInitialState = {
  currentProfile: null,
  profileLoading: false,
  currentFollowers: [],
  currentFollowings: [],
  toggleFollowLoading: false,
};

export const getUserById = createAsyncThunk(
  'user/id',
  async (userId: string, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{
        data: User & { followerIds: any[]; followedIds: any[] };
      }>(`${apiUrls.user.getUser}/${userId}`);
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const toggleFollow = createAsyncThunk(
  'user/toggle',
  async (
    { followerId, followedId }: { followerId: string; followedId: string },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.put<{
        data: FollowInstance;
        status: 'follow' | 'unfollow';
        follow: string;
      }>(`${apiUrls.user.toggleFollowUser}/${followerId}/${followedId}`);
      return response.data;
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
      const { followedIds, followerIds } = action.payload;
      state.profileLoading = false;
      state.currentProfile = action.payload;
      state.currentFollowers = followerIds;
      state.currentFollowings = followedIds;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.profileLoading = false;
    });
    builder.addCase(toggleFollow.pending, (state) => {
      state.toggleFollowLoading = true;
    });
    builder.addCase(toggleFollow.fulfilled, (state, action) => {
      const { data, status, follow: followId } = action.payload;
      state.toggleFollowLoading = false;
      if (status === 'follow') {
        state.currentFollowers = [...state.currentFollowers, data];
      } else {
        state.currentFollowers = state.currentFollowers.filter(
          (follow) => follow.id !== followId
        );
      }
    });
    builder.addCase(toggleFollow.rejected, (state, action:any) => {
      state.toggleFollowLoading=false;
      toast.error(i18n.t(`errors.${action.payload.message.error||'something_went_wrong'}`), toastOptions);
    });
    builder.addCase(uploadProfileImage.fulfilled,(state,action)=>{
      if(state.currentProfile) {
        state.currentProfile={...state.currentProfile,profileImage:action.payload}
      }
    })
  },
});

export default userSlice.reducer;
