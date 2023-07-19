import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';
import { SearchInitialState } from '../types/search';

const initialState:SearchInitialState={
    searchedItems:[],
    searchLoading:false,
    searchQuery:''
}

export const getFullTextSearch=createAsyncThunk('search',async({searchQuery}:{searchQuery:string},thunkApi)=>{
    try{
    const response=await axiosApiInstance.put<{data:any}>(apiUrls.search.getFullText,{searchQuery});
    return response.data.data;
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})  
const searchReducer=createSlice({
    name:'search',
    initialState,
    reducers:{},
    extraReducers:builder=>{
    builder.addCase(getFullTextSearch.pending,state=>{
        state.searchLoading=true;
    });
    builder.addCase(getFullTextSearch.fulfilled,(state,action)=>{
        state.searchQuery=action.meta.arg.searchQuery;
        state.searchLoading=false;
        state.searchedItems=action.payload;
    });
    builder.addCase(getFullTextSearch.rejected,(state,action)=>{
        state.searchLoading=false;
    })
    }
})

export default searchReducer.reducer;