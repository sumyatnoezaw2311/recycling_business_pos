import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from '../../config/config'
import { ShowToast } from "../../component/utils/ShowToast";

export const deletFinished = createAsyncThunk(
    'finished/deletFinished',
    async (id)=>{
        try{
            const response = await Axios.delete(
                `${BASE_URL}/finished/delete/${id}`,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            ShowToast('success','အောင်မြင်စွာဖျက်ပြီးပါပြီ')
            return data
        }catch(error){
            if(error.response.status === 401){
                ShowToast('error','ကျေးဇူးပြု၍လော့အင်ပြန်ဝင်ပါ')
                localStorage.removeItem('recycleAppAuth')
            }else{
                ShowToast('error','မှားယွင်းနေပါသည်')
            }
            throw new Error(error)
        }
    }
)


const deletFinishedSlice = createSlice({
    name: 'deletFinished',
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(deletFinished.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(deletFinished.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(deletFinished.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default deletFinishedSlice.reducer