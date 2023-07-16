import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import commonReducer from './commonReducer';
import authReducer from './authReducer';
import collectionReducer from './collectionReducer';
import itemReducer from './itemReducer';
import userReducer from './userReducer';
import adminReducer from './adminReducer';
import searchReducer from './searchReducer';

const store = configureStore({
  reducer:{
    common:commonReducer,
    auth:authReducer,
    collection:collectionReducer,
    item:itemReducer,
    user:userReducer,
    admin:adminReducer,
    search:searchReducer
  },
  middleware:getDefaultMiddleware=>getDefaultMiddleware({
    serializableCheck:false
  })
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;

export const useAppDispatch:()=>AppDispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;

export default store;
