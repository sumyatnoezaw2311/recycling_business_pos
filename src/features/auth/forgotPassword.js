import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL } from '../../config/config'
import { ShowToast } from '../../component/utils/ShowToast'

export const fetchPasswordResetLink = createAsyncThunk(
    'auth/forgotPassword',
    async (email)=>{
        try{
            const response = await Axios.post(
                `${BASE_URL}/auth/forgot-password`,
                email
            )
            const data = response.data
            ShowToast('success','လင့်(ခ်)ကိုအောင်မြင်စွာပို့ပြီးပါပြီ')
            return data
        }catch(error){
            ShowToast('error','မှားယွင်းနေပါသည်')
            throw new Error(error)
        }
    }
)


const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchPasswordResetLink.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchPasswordResetLink.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchPasswordResetLink.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default forgotPasswordSlice.reducer