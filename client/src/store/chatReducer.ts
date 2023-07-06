import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';
import { ChatInitialState } from '../types/chat';

const initialState: ChatInitialState = {
  currentChat: null,
  currentConversations: null,
  getCurrentConversationsLoading: false,
  getMessagesLoading: false,
  chatFollows: null,
  getFollowsLoading: false,
  sendMessageLoading: false,
};

export const getCurrentConversations = createAsyncThunk(
  'chat/getConvos',
  async (_, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{ data: any }>(
        apiUrls.chat.getCurrentConversations
      );
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async (
    { memberOne, memberTwo }: { memberOne: string; memberTwo: string },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.get<{ data: any }>(
        `${apiUrls.chat.getMessages}/${memberOne}/${memberTwo}`
      );
      console.log(response.data.data, 'haha');
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (
    {
      text,
      receiverId,
      chatId,
      onSuccess,
    }: {
      text: string;
      receiverId: string;
      chatId: string;
      onSuccess: (message:any)=>void;
    },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post<{ message: any }>(
        `${apiUrls.chat.sendMessage}/${receiverId}/${chatId}`,
        {
          text,
        }
      );
      console.log(response.data);
      onSuccess && onSuccess(response.data.message);
      return response.data.message;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getMyFollows = createAsyncThunk(
  'chat/getFollows',
  async (_, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{ data: any }>(
        apiUrls.chat.getMyFollows
      );
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    receiveMessage: (state, action) => {
      if (state.currentChat) {
        state.currentChat = {
          ...state.currentChat,
          messages: [...state.currentChat.messages, action.payload],
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentConversations.pending, (state) => {
      state.getCurrentConversationsLoading = true;
    });
    builder.addCase(getCurrentConversations.fulfilled, (state, action) => {
      state.getCurrentConversationsLoading = false;
      state.currentConversations = action.payload;
    });
    builder.addCase(getCurrentConversations.rejected, (state, action) => {
      state.getCurrentConversationsLoading = false;
    });
    builder.addCase(getMessages.pending, (state) => {
      state.getMessagesLoading = true;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.getMessagesLoading = false;
      state.currentChat = action.payload;
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      state.getMessagesLoading = false;
    });
    builder.addCase(getMyFollows.pending, (state) => {
      state.getFollowsLoading = true;
    });
    builder.addCase(getMyFollows.fulfilled, (state, action) => {
      state.getFollowsLoading = false;
      console.log(action.payload);
      state.chatFollows = action.payload;
    });
    builder.addCase(getMyFollows.rejected, (state, action) => {
      state.getFollowsLoading = false;
    });
    builder.addCase(sendMessage.pending, (state) => {
      state.sendMessageLoading = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.sendMessageLoading = false;
      if (state.currentChat) {
        state.currentChat = {
          ...state.currentChat,
          messages: [...state.currentChat.messages, action.payload],
        };
      }
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.sendMessageLoading = false;
    });
  },
});

export const { receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
