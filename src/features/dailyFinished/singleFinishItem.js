import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";


export const fetchDailyFinishedItem = createAsyncThunk(
    'finished/dailyFinishedItem',
    async(id)=>{
        try{
            const response = await Axios.get(`${BASE_URL}/finished/${id}`,
                {
                    headers: HEADERS()
                }
            )
            return response.data
        }catch(error){
            throw new Error(error)
        }
    }
)

const dailyFinishedItemSlice = createSlice({
    name: "dailyFinishedItem",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {
        resetSingleFinishedItem: (state)=>{
            state.data = []
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchDailyFinishedItem.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchDailyFinishedItem.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchDailyFinishedItem.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})

export const {
    resetSingleFinishedItem
} = dailyFinishedItemSlice.actions

export default dailyFinishedItemSlice.reducer