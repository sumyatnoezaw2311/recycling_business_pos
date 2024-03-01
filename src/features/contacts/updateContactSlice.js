import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from '../../config/config'
import { ShowToast } from "../../component/utils/ShowToast";


export const updateContact = createAsyncThunk(
    'contacts/updateContact',
    async ({contactId,updateData})=>{
        try{
            const response = await Axios.put(
                `${BASE_URL}/contacts/update/${contactId}`,
                updateData,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            ShowToast('success','ပြင်ဆင်ခြင်းအောင်မြင်ပါသည်')
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


const updateContactSlice = createSlice({
    name: 'updateContact',
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(updateContact.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(updateContact.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(updateContact.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default updateContactSlice.reducer