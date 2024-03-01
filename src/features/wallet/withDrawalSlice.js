import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";


export const withDrawal = createAsyncThunk(
    'wallet/withDrawal',
    async (withDrawalData)=>{
        try{
            const response = await Axios.post(
                `${BASE_URL}/wallet-transactions/withdrawal`,
                withDrawalData,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            return data
        }catch(error){
            throw new Error(error)
        }
    }
)

const withDrawalSlice = createSlice({
    name: "withDrawal",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(withDrawal.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(withDrawal.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(withDrawal.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default withDrawalSlice.reducer