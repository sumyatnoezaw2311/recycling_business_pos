import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from '../../config/config'
import { ShowToast } from "../../component/utils/ShowToast";

export const createFinishedItem = createAsyncThunk(
    'finished/createFinishedItem',
    async (createData)=>{
        try{
            const response = await Axios.post(
                `${BASE_URL}/finished/store`,
                createData,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            ShowToast('success','အသစ်ထည့်ခြင်းအောင်မြင်ပါသည်')
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


const createFinishedItemSlice = createSlice({
    name: 'createFinishedItem',
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(createFinishedItem.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(createFinishedItem.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(createFinishedItem.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default createFinishedItemSlice.reducer