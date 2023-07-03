import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';


const initialState={
  users: null,
  getUsersLoading:false,


}

export const getUsers=createAsyncThunk('admin/users',async(_,thunkApi)=>{
    try{
    const response=await axiosApiInstance.get<{data:any[]}>(apiUrls.admin.getUsers);
    return response.data.data;
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})

export const filterUsers= createAsyncThunk('admin/filter',async({filter}:{filter:string},thunkApi)=>{
    try{
    const response=await axiosApiInstance.put<{data:any[]}>(apiUrls.admin.filterUsers,{filter});
    console.log(response.data.data);
    return response.data.data;
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})



const adminReducer=createSlice({
    name:'admin',
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getUsers.pending,state=>{
            state.getUsersLoading=true;
        });
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            state.getUsersLoading=false;
            state.users=action.payload;
        });
        builder.addCase(getUsers.rejected,(state,action)=>{
            state.getUsersLoading=false;
        });
        builder.addCase(filterUsers.pending,state=>{
            state.getUsersLoading=true;
        });
        builder.addCase(filterUsers.fulfilled,(state,action)=>{
            state.getUsersLoading=false;
            state.users=action.payload;

        });
        builder.addCase(filterUsers.rejected,(state,action)=>{
            state.getUsersLoading=false;
        })
    }
})



export default adminReducer.reducer;

