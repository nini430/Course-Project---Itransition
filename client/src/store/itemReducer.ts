import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ExtendedItem, Item, ItemInitialState, ItemInput } from '../types/item';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';
import { toast } from 'react-hot-toast';
import toastOptions from '../utils/toastOptions';
import { Comment, CommentInput } from '../types/comment';
import { CommentReaction, ItemReaction } from '../types/reaction';

const initialState: ItemInitialState = {
  addItemLoading: false,
  editItemLoading: false,
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
  removeCommentLoading: false,
  editCommentLoading: false,
  myItems: [],
  getMyItemsLoading: false,
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
      console.log(itemId,'lka!!')
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

export const editItem = createAsyncThunk(
  'item/edit',
  async (
    {
      itemId,
      onSuccess,
      input,
    }: { itemId: string; onSuccess: VoidFunction; input: ItemInput },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.put<{ data: Item }>(
        `${apiUrls.item.editItem}/${itemId}`,
        { input }
      );
      console.log(itemId,'ka!!')
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

export const editComment = createAsyncThunk(
  '/comment/edit',
  async (
    {
      commentId,
      input,
      onSuccess,
    }: { commentId: string; input: CommentInput; onSuccess: VoidFunction },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.put<{ data: Comment }>(
        `${apiUrls.comment.editComment}/${commentId}`,
        { input }
      );
      onSuccess && onSuccess();
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const removeComment = createAsyncThunk(
  '/comment/remove',
  async (
    { commentId, onSuccess }: { commentId: string; onSuccess: VoidFunction },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.delete<{ data: string }>(
        `${apiUrls.comment.removeComment}/${commentId}`
      );
      onSuccess && onSuccess();
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const addItemReaction = createAsyncThunk(
  '/itemReaction/add',
  async (
    { itemId, input }: { itemId: string; input: { name: string } },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post<{
        data: ItemReaction;
        status: 'update' | 'create';
        reactionId?: string;
      }>(`${apiUrls.itemReaction.addReaction}/${itemId}`, { input });
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const unreactItem = createAsyncThunk(
  '/itemReaction/unreact',
  async ({ reactionId }: { reactionId: string }, thunkApi) => {
    try {
      const response = await axiosApiInstance.delete<{ reactionId: string }>(
        `${apiUrls.itemReaction.unreactItem}/${reactionId}`
      );
      return response.data.reactionId;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const reactComment = createAsyncThunk(
  '/commentReaction/react',
  async (
    { commentId, emoji }: { commentId: string; emoji: string },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post<{
        data: CommentReaction;
        status: 'create' | 'update';
        reactionId?: string;
      }>(`${apiUrls.commentReaction.addReaction}/${commentId}`, { emoji });
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const unreactComment = createAsyncThunk(
  '/commentReaction/unreact',
  async ({ reactionId }: { reactionId: string }, thunkApi) => {
    try {
      const response = await axiosApiInstance.delete<{
        reactionId: string;
        commentId: string;
      }>(`${apiUrls.commentReaction.unreactComment}/${reactionId}`);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getMyItems = createAsyncThunk(
  '/my-items/get',
  async ({ collectionId }: { collectionId: string }, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{ data: Item[] }>(
        `${apiUrls.item.getMyItems}/${collectionId}`
      );
      console.log(response.data);
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    toggleCommentImage: (
      state,
      action: PayloadAction<{
        commentId: string;
        image?: string;
        status: 'remove' | 'cancel';
      }>
    ) => {
      if (state.currentItem) {
        const { commentId, image, status } = action.payload;
        if (status === 'remove') {
          state.currentItem = {
            ...state.currentItem,
            comments: state.currentItem.comments.map((comment) =>
              comment.id === commentId
                ? { ...comment, image: undefined }
                : comment
            ),
          };
        } else if (status === 'cancel') {
          state.currentItem = {
            ...state.currentItem,
            comments: state.currentItem.comments.map((comment) =>
              comment.id === commentId ? { ...comment, image } : comment
            ),
          };
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeItemConfig.pending, (state) => {
      state.initializeFormLoading = true;
    });
    builder.addCase(initializeItemConfig.fulfilled, (state, action) => {
      state.initializeFormLoading = false;
      console.log(action.payload,'!')
      state.formCustomFields = action.payload;
    });
    builder.addCase(initializeItemConfig.rejected, (state, action) => {
      toast.error('something_went_wrong', toastOptions);
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
    builder.addCase(addComment.rejected, (state) => {
      state.addCommentLoading = false;
    });
    builder.addCase(removeComment.pending, (state) => {
      state.removeCommentLoading = true;
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.removeCommentLoading = false;
      const updatedComments = state.currentItem?.comments.filter(
        (comment) => comment.id !== action.meta.arg.commentId
      ) as Comment[];
      if (state.currentItem) {
        state.currentItem = { ...state.currentItem, comments: updatedComments };
      }
      toast.success('comment_removed', toastOptions);
    });
    builder.addCase(removeComment.rejected, (state, action) => {
      state.removeCommentLoading = false;
    });
    builder.addCase(editComment.pending, (state) => {
      state.editCommentLoading = true;
    });
    builder.addCase(editComment.fulfilled, (state, action) => {
      state.editCommentLoading = false;
      const updatedComments = state.currentItem?.comments.map((comment) =>
        comment.id === action.meta.arg.commentId ? action.payload : comment
      );
      if (state.currentItem) {
        state.currentItem = {
          ...state.currentItem,
          comments: updatedComments as Comment[],
        };
      }
      toast.success('comment_updated', toastOptions);
    });
    builder.addCase(editComment.rejected, (state, action) => {
      state.editItemLoading = false;
    });
    builder.addCase(addItemReaction.fulfilled, (state, action) => {
      const { status, data, reactionId } = action.payload;
      let updatedReactions;
      if (state.currentItem) {
        if (status === 'create') {
          updatedReactions = [...state.currentItem.reactions, data];
        } else {
          updatedReactions = state.currentItem.reactions.map((item) =>
            item.id === reactionId ? data : item
          );
        }
        state.currentItem = {
          ...state.currentItem,
          reactions: updatedReactions,
        };
      }
    });
    builder.addCase(addItemReaction.rejected, (state, action) => {
      toast.error('something_went_wrong', toastOptions);
    });
    builder.addCase(unreactItem.fulfilled, (state, action) => {
      if (state.currentItem) {
        const updatedReactions = state.currentItem.reactions.filter(
          (react) => react.id !== action.meta.arg.reactionId
        );
        state.currentItem = {
          ...state.currentItem,
          reactions: updatedReactions,
        };
      }
    });
    builder.addCase(unreactItem.rejected, (state, action) => {
      toast.error('something_went_wrong', toastOptions);
    });
    builder.addCase(reactComment.fulfilled, (state, action) => {
      if (state.currentItem) {
        let updatedReactions;
        const { data, status, reactionId } = action.payload;
        if (status === 'create') {
          updatedReactions = state.currentItem.comments.map((comment) =>
            comment.id === action.meta.arg.commentId
              ? { ...comment, reactions: [...comment.reactions, data] }
              : comment
          );
        } else {
          updatedReactions = state.currentItem.comments.map((comment) =>
            comment.id === action.meta.arg.commentId
              ? {
                  ...comment,
                  reactions: comment.reactions.map((reaction) =>
                    reaction.id === reactionId ? data : reaction
                  ),
                }
              : comment
          );
        }
        state.currentItem = {
          ...state.currentItem,
          comments: updatedReactions,
        };
      }
    });
    builder.addCase(reactComment.rejected, (state, action) => {
      toast.error('something_went_wrong', toastOptions);
    });
    builder.addCase(unreactComment.fulfilled, (state, action) => {
      const { reactionId, commentId } = action.payload;
      if (state.currentItem) {
        const updatedReactions = state.currentItem.comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                reactions: comment.reactions.filter(
                  (reaction) => reaction.id !== reactionId
                ),
              }
            : comment
        );
        state.currentItem = {
          ...state.currentItem,
          comments: updatedReactions,
        };
      }
    });
    builder.addCase(unreactComment.rejected, (state, action) => {
      toast.error('something_went_wrong', toastOptions);
    });
    builder.addCase(getMyItems.pending, (state) => {
      state.getMyItemsLoading = true;
    });
    builder.addCase(getMyItems.fulfilled, (state, action) => {
      state.getMyItemsLoading = false;
      state.myItems = action.payload;
    });
    builder.addCase(getMyItems.rejected, (state, action) => {
      state.getMyItemsLoading = false;
    });
  },
});

export const { toggleCommentImage } = itemSlice.actions;

export default itemSlice.reducer;
