import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL, HEADERS } from "../../config/config";
import { ShowToast } from '../../component/utils/ShowToast'


export const registerAccount = createAsyncThunk(
    "accounts/registerAccount",
    async (registerData)=>{
        try{
            const response = await Axios.post(
                `${BASE_URL}/users/register`,
                registerData,
                {
                  headers: HEADERS()
                }
              );
            const data = response.data
            ShowToast('success','အကောင့်သစ်ပြုလုပ်ခြင်းအောင်မြင်ပါသည်')
            return data
        }catch(error){
            ShowToast('error','မှားယွင်းနေပါသည်')
            throw new Error(error)
        }
    }
)


const registerAccountSlice = createSlice({
    name: 'registerAccount',
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(registerAccount.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(registerAccount.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(registerAccount.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default registerAccountSlice.reducer