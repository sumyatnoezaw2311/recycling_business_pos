import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL, HEADERS } from '../../config/config'
// import { ShowToast } from "../../components/utils/ShowToast";

export const verifyToken = createAsyncThunk(
    'licenses/verifyToken',
    async (oneTimeToken)=>{
        try{
            const response = await Axios.get(
                `${BASE_URL}/auth/verify-reset-password-token/${oneTimeToken}`,
            )
            const data = response.data
            return data
        }catch(error){
            // if(error.response.status === 401){
            //     ShowToast('error','Token is invalid')
            // }else{
            //     ShowToast('error','Something went wrong')
            // }
            throw new Error(error)
        }
    }
)


const verifyTokenSlice = createSlice({
    name: "verifyToken",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(verifyToken.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(verifyToken.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(verifyToken.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default verifyTokenSlice.reducer