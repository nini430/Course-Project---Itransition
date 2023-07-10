import jsCookie from 'js-cookie';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommonInitialState } from '../types/common';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';

const initialState: CommonInitialState = {
  mode: (localStorage.getItem('mode') as 'light' | 'dark') || 'light',
  lang: (jsCookie.get('i18next') as 'en' | 'ka') || 'en',
  isSidebarOpen:false
};

export const testAuthedRoute = createAsyncThunk('/test', async () => {
  const response = await axiosApiInstance.get(apiUrls.test.test);
  console.log(response.data);
});

const commonReducer = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', state.mode);
    },
    toggleSidebar(state) {
      state.isSidebarOpen=!state.isSidebarOpen
    },
    changeLang(state) {
      state.lang = state.lang === 'en' ? 'ka' : 'en';
    },
  },
});

export const { changeTheme, changeLang, toggleSidebar } = commonReducer.actions;

export default commonReducer.reducer;
