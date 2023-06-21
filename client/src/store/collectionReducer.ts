import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CollectionInitialState, CollectionValues } from '../types/collection';
import axiosApiInstance from '../axios';
import apiUrls from '../api/api';
import { Collection } from '../types/collection';

const initialState: CollectionInitialState = {
  collectionTopics: [],
  topicsLoading: false,
  addCollectionLoading: false,
  getLargestCollectionsLoading:false,
  largestCollections:null,
  myCollections:null,
  getMyCollectionsLoading:false,
  removeCollectionLoading:false

};

export const getCollectionTopics = createAsyncThunk(
  '/collection/topics',
  async (_, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{ data: string[] }>(
        apiUrls.collection.topics
      );
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const addCollection = createAsyncThunk(
  '/collection/add',
  async (
    { input, onSuccess, configs }: { input: CollectionValues; configs:any; onSuccess: VoidFunction },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post(
        apiUrls.collection.add,
        {input,
        configs}
      );
      console.log(response.data);
      onSuccess && onSuccess();
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getLargestCollections= createAsyncThunk('/collection/largest',async(_,thunkApi)=>{
    try{
      const response=await axiosApiInstance.get<{data:any}>(apiUrls.collection.latest);
      return response.data.data;
    }catch(err) {
      return thunkApi.rejectWithValue(err);
    }
});
export const getMyCollections = createAsyncThunk(
  'collection/myCollections',
  async (_, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{
        data: { collections: Collection[] };
      }>(apiUrls.collection.myCollections);
      console.log(response.data);
      return response.data.data.collections;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const removeCollection = createAsyncThunk('collection/remove',async({collectionId,onSuccess}:{collectionId:string,onSuccess:VoidFunction},thunkApi)=>{
   try{
    const response=await axiosApiInstance.delete(`${apiUrls.collection.removeCollection}/${collectionId}`);
    onSuccess && onSuccess();
    return response.data;
   }catch(err) {
    return thunkApi.rejectWithValue(err);
   }
})


const collectionReducer = createSlice({
  name: 'collection',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCollectionTopics.pending, (state) => {
      state.topicsLoading = true;
    });
    builder.addCase(getCollectionTopics.fulfilled, (state, action) => {
      state.topicsLoading = false;
      state.collectionTopics = action.payload;
    });
    builder.addCase(getCollectionTopics.rejected, (state) => {
      state.topicsLoading = false;
    });
    builder.addCase(addCollection.pending, (state) => {
      state.addCollectionLoading = true;
    });
    builder.addCase(addCollection.fulfilled, (state) => {
      state.addCollectionLoading = false;
    });
    builder.addCase(addCollection.rejected, (state) => {
      state.addCollectionLoading = false;
    });
    builder.addCase(getLargestCollections.pending,state=>{
      state.getLargestCollectionsLoading=true;
    });
    builder.addCase(getLargestCollections.fulfilled,(state,action)=>{
      state.getLargestCollectionsLoading=false;
      state.largestCollections=action.payload;
    });
    builder.addCase(getLargestCollections.rejected,(state,action)=>{
      state.getLargestCollectionsLoading=false;
    });
    builder.addCase(getMyCollections.pending,state=>{
      state.getMyCollectionsLoading=true;
    });
    builder.addCase(getMyCollections.fulfilled,(state,action)=>{
      state.getMyCollectionsLoading=false;
      console.log(action.payload);
      state.myCollections=action.payload;
    });
    builder.addCase(getMyCollections.rejected,(state,action)=>{
      state.getMyCollectionsLoading=false;
    });
    builder.addCase(removeCollection.pending,state=>{
      state.removeCollectionLoading=true;
    });
    builder.addCase(removeCollection.fulfilled,(state,action)=>{
      state.removeCollectionLoading=false;
      state.myCollections=state.myCollections?.filter(collection=>collection.id!==action.meta.arg.collectionId) as Collection[];
    });
    builder.addCase(removeCollection.rejected,(state,action)=>{
      state.removeCollectionLoading=false;
    })
  },
});

export default collectionReducer.reducer;
