import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CollectionInitialState, CollectionValues } from '../types/collection';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';

const initialState: CollectionInitialState = {
  collectionTopics: [],
  topicsLoading: false,
  addCollectionLoading: false,
};

export const getCollectionTopics = createAsyncThunk(
  '/collection/topics',
  async (_, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{ data: string[] }>(
        apiUrls.collection.topics
      );
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const addCollection = createAsyncThunk(
  '/collection/add',
  async (
    { input, onSuccess }: { input: CollectionValues; onSuccess: VoidFunction },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post(
        apiUrls.collection.add,
        input
      );
      console.log(response.data);
      onSuccess && onSuccess();
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const collectionReducer = createSlice({
  name: 'collection',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCollectionTopics.pending, (state) => {
      state.topicsLoading = true;
    });
    builder.addCase(getCollectionTopics.fulfilled, (state, action) => {
      state.topicsLoading = false;
      state.collectionTopics = action.payload;
    });
    builder.addCase(getCollectionTopics.rejected, (state) => {
      state.topicsLoading = false;
    });
    builder.addCase(addCollection.pending, (state) => {
      state.addCollectionLoading = true;
    });
    builder.addCase(addCollection.fulfilled, (state, action) => {
      state.addCollectionLoading = false;
    });
    builder.addCase(addCollection.rejected, (state, action) => {
      state.addCollectionLoading = false;
    });
  },
});

export default collectionReducer.reducer;
