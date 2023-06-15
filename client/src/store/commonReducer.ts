import jsCookie from 'js-cookie'
import { createSlice } from '@reduxjs/toolkit';
import { CommonInitialState } from '../types/common';


const initialState: CommonInitialState = {
  mode: (localStorage.getItem('mode') as 'light'|'dark') || 'light',
  lang:(jsCookie.get('i18next') as 'en'|'ka') || 'en' 
};

const commonReducer = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode',state.mode)
    },
    changeLang(state) {
      state.lang= state.lang==='en'?'ka':'en';
    }
  },
});

export const { changeTheme, changeLang } = commonReducer.actions;

export default commonReducer.reducer;
