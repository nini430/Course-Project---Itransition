import { createSlice } from '@reduxjs/toolkit';
import { CommonInitialState } from '../types/common';

const initialState: CommonInitialState = {
  mode: (localStorage.getItem('mode') as 'light'|'dark') || 'light'
};

const commonReducer = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode',state.mode)
    },
  },
});

export const { changeTheme } = commonReducer.actions;

export default commonReducer.reducer;
