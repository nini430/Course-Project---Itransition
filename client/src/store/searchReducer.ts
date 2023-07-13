import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState={
    searchedItems:[]
}


const searchReducer=createSlice({
    name:'search',
    initialState,
    reducers:{

    }
})

export default searchReducer.reducer;