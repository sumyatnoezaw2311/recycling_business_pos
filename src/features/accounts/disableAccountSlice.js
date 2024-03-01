import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from '../../config/config'
import { ShowToast } from '../../component/utils/ShowToast'

export const disableAccount = createAsyncThunk(
    'accounts/disableAccount',
    async (userId)=>{
        try{
            const response = await Axios.put(
                `${BASE_URL}/users/off/${userId}`,
                null,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            ShowToast('success','အောင်မြင်စွာဖျက်ပြီးပါပြီ')
            return data
        }catch(error){
            ShowToast('error','မှားယွင်းနေပါသည်')
            throw new Error(error)
        }
    }
)


const disableAccountSlice = createSlice({
    name: 'disableAccount',
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(disableAccount.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(disableAccount.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(disableAccount.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default disableAccountSlice.reducer