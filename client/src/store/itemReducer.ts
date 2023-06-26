import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ExtendedItem, Item, ItemInitialState, ItemInput } from '../types/item';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';
import { toast } from 'react-hot-toast';
import toastOptions from '../utils/toastOptions';
import { Comment, CommentInput } from '../types/comment';

const initialState: ItemInitialState = {
  addItemLoading: false,
  initializeFormLoading: false,
  formCustomFields: null,
  getItemTagsLoading: false,
  itemTags: [],
  latestItems: null,
  getLatestItemsLoading: false,
  getSingleItemLoading: false,
  currentItem: null,
  removeItemLoading: false,
  addCommentLoading: false,
};

export const initializeItemConfig = createAsyncThunk(
  'item/config',
  async (collectionId: string, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{ data: Item }>(
        `${apiUrls.item.initialize}/${collectionId}`
      );
      console.log(response.data);
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const addItem = createAsyncThunk(
  'item/add',
  async (
    {
      input,
      onSuccess,
      collectionId,
    }: { input: ItemInput; onSuccess: VoidFunction; collectionId: string },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post<{ data: any }>(
        `${apiUrls.item.add}/${collectionId}`,
        input
      );
      onSuccess && onSuccess();
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getItemTags = createAsyncThunk(
  'item/tags',
  async (_, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{ data: any }>(
        apiUrls.item.tags
      );
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getLatestItems = createAsyncThunk(
  'item/latest',
  async (_, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{ data: Item[] }>(
        apiUrls.item.latest
      );
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getSingleItem = createAsyncThunk(
  'item/get',
  async (itemId: string, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{ data: ExtendedItem }>(
        `${apiUrls.item.getSingleItem}/${itemId}`
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const removeItem = createAsyncThunk(
  'item/delete',
  async (
    { itemId, onSuccess }: { itemId: string; onSuccess: VoidFunction },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.delete<{ data: string }>(
        `${apiUrls.item.removeItem}/${itemId}`
      );
      onSuccess && onSuccess();
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const addComment = createAsyncThunk(
  'comment/add',
  async (
    { input, itemId }: { input: CommentInput; itemId: string },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post<{ data: Comment }>(
        `${apiUrls.comment.addComment}/${itemId}`,
        { input }
      );
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initializeItemConfig.pending, (state) => {
      state.initializeFormLoading = true;
    });
    builder.addCase(initializeItemConfig.fulfilled, (state, action) => {
      state.initializeFormLoading = false;
      state.formCustomFields = action.payload;
    });
    builder.addCase(addItem.pending, (state) => {
      state.addItemLoading = true;
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.addItemLoading = false;
    });
    builder.addCase(addItem.rejected, (state, action) => {
      state.addItemLoading = false;
    });
    builder.addCase(getItemTags.pending, (state) => {
      state.getItemTagsLoading = true;
    });
    builder.addCase(getItemTags.fulfilled, (state, action) => {
      state.getItemTagsLoading = false;
      state.itemTags = action.payload;
    });
    builder.addCase(getItemTags.rejected, (state, action) => {
      state.getItemTagsLoading = false;
    });
    builder.addCase(getLatestItems.pending, (state) => {
      state.getLatestItemsLoading = true;
    });
    builder.addCase(getLatestItems.fulfilled, (state, action) => {
      state.getLatestItemsLoading = false;
      state.latestItems = action.payload;
    });
    builder.addCase(getLatestItems.rejected, (state, action) => {
      state.getLatestItemsLoading = false;
    });
    builder.addCase(getSingleItem.pending, (state) => {
      state.getSingleItemLoading = true;
    });
    builder.addCase(getSingleItem.fulfilled, (state, action) => {
      state.getSingleItemLoading = false;
      state.currentItem = action.payload;
    });
    builder.addCase(getSingleItem.rejected, (state, action) => {
      state.getSingleItemLoading = false;
    });
    builder.addCase(removeItem.pending, (state) => {
      state.removeItemLoading = true;
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.removeItemLoading = false;
      toast.success(action.payload, toastOptions);
    });
    builder.addCase(addComment.pending, (state) => {
      state.addCommentLoading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.addCommentLoading = false;
      if (state.currentItem) {
        state.currentItem = {
          ...state.currentItem,
          comments: [action.payload, ...(state.currentItem?.comments as any)],
        };
      }
    });
    builder.addCase(addComment.rejected,(state,action)=>{
        state.addCommentLoading=false;
    });
  },
});

export default itemSlice.reducer;
