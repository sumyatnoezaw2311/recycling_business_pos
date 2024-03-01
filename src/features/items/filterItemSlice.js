import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";


export const filterItem = createAsyncThunk(
    'items/filterItem',
    async(itemName)=>{
        const url = itemName ? `items?name=${itemName}` : `items`
        try{
            const response = await Axios.get(`${BASE_URL}/${url}`,
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

const filterItemSlice = createSlice({
    name: "filterItem",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(filterItem.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(filterItem.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(filterItem.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default filterItemSlice.reducer