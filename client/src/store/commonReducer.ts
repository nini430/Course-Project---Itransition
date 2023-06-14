import { createSlice } from '@reduxjs/toolkit';
import { CommonInitialState } from '../types/common';

const initialState: CommonInitialState = {
  mode: 'light',
};

const commonReducer = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { changeTheme } = commonReducer.actions;

export default commonReducer.reducer;
