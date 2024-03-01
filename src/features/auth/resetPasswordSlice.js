import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL } from '../../config/config'
import { ShowToast } from '../../component/utils/ShowToast'


export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({resetData,oneTimeToken})=>{
        try{
            const response = await Axios.put(
                `${BASE_URL}/auth/reset-password`,
                resetData,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + oneTimeToken,
                },
            )
            const data = response.data
            ShowToast('success','Password ချိန်းခြင်းအောင်မြင်ပါသည်')
            return data
        }catch(error){
            ShowToast('error','မှားယွင်းနေပါသည်')
            throw new Error(error)
        }
    }
)


const resetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(resetPassword.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(resetPassword.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(resetPassword.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default resetPasswordSlice.reducer