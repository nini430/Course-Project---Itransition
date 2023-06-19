import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { Item, ItemInitialState, ItemInput } from '../types/item';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';




const initialState: ItemInitialState = {
    addItemLoading: false,
    initializeFormLoading:false,
    formCustomFields:null,
    getItemTagsLoading:false,
    itemTags:[],
    latestItems:null,
    getLatestItemsLoading:false
}

export const initializeItemConfig=createAsyncThunk('item/config',async(collectionId:string,thunkApi)=>{
        try{
        const response=await axiosApiInstance.get<{data:Item}>(`${apiUrls.item.initialize}/${collectionId}`);
        console.log(response.data);
        return response.data.data;
        }catch(err) {
            return thunkApi.rejectWithValue(err);
        }
})

export const addItem= createAsyncThunk('item/add',async({input,onSuccess,collectionId}:{input:ItemInput,onSuccess:VoidFunction,collectionId:string},thunkApi)=>{
   try{
    const response=await axiosApiInstance.post<{data:any}>(`${apiUrls.item.add}/${collectionId}`,input);
    onSuccess && onSuccess();
    return response.data.data;
   }catch(err) {
    return thunkApi.rejectWithValue(err);
   }
});

export const getItemTags=createAsyncThunk('item/tags',async(_,thunkApi)=>{
    try{
    const response=await axiosApiInstance.get<{data:any}>(apiUrls.item.tags);
    return response.data.data;
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
});

export const getLatestItems=createAsyncThunk('item/latest',async(_,thunkApi)=>{
    try{
    const response=await axiosApiInstance.get<{data:Item[]}>(apiUrls.item.latest);
    return  response.data.data;
    }catch(err) {
    return thunkApi.rejectWithValue(err);
    }
})

const itemSlice=createSlice({
    name:'item',
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(initializeItemConfig.pending,(state=>{
            state.initializeFormLoading=true;
        }));
        builder.addCase(initializeItemConfig.fulfilled,(state,action)=>{
            state.initializeFormLoading=false;
            state.formCustomFields=action.payload;
        });
        builder.addCase(addItem.pending,state=>{
            state.addItemLoading=true;
        });
        builder.addCase(addItem.fulfilled,(state,action)=>{
            state.addItemLoading=false;
        });
        builder.addCase(addItem.rejected,(state,action)=>{
            state.addItemLoading=false;
        });
        builder.addCase(getItemTags.pending,state=>{
            state.getItemTagsLoading=true;
        });
        builder.addCase(getItemTags.fulfilled,(state,action)=>{
            state.getItemTagsLoading=false;
            state.itemTags=action.payload;
        });
        builder.addCase(getItemTags.rejected,(state,action)=>{
            state.getItemTagsLoading=false;
        });
        builder.addCase(getLatestItems.pending,state=>{
            state.getLatestItemsLoading=true;
        });
        builder.addCase(getLatestItems.fulfilled,(state,action)=>{
            state.getLatestItemsLoading=false;
            state.latestItems=action.payload;
        });
        builder.addCase(getLatestItems.rejected,(state,action)=>{
            state.getLatestItemsLoading=false;
        })

    }

})

export default itemSlice.reducer;