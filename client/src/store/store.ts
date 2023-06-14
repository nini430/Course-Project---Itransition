import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import commonReducer from './commonReducer';

const store = configureStore({
  reducer:{
    common:commonReducer
  }
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;

export const useAppDispatch:()=>AppDispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;

export default store;
