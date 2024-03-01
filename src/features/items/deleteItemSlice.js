import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";
import { ShowToast } from '../../component/utils/ShowToast'


export const deleteItem = createAsyncThunk(
    'items/deleteItem',
    async(itemId)=>{
        try{
            const response = await Axios.put(
                `${BASE_URL}/items/off/${itemId}`,
                null,
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

const deleteItemSlice = createSlice({
    name: "deleteItem",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(deleteItem.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(deleteItem.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(deleteItem.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default deleteItemSlice.reducer