import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";
import { ShowToast } from "../../component/utils/ShowToast";



export const deleteSaleOrPur = createAsyncThunk(
    'salesOrPurchases/deleteSaleOrPur',
    async({saleOrPurchase,id})=>{
        try{
            const response = await Axios.delete(
                `${BASE_URL}/${saleOrPurchase}/delete/${id}`,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            ShowToast('success','ဖျက်ခြင်းအောင်မြင်ပါသည်')
            return data
        }catch(error){
            ShowToast('error','မှားယွင်းနေပါသည်')
            throw new Error(error)
        }
    }
)

const deleteSaleOrPurSlice = createSlice({
    name: "deleteSaleOrPur",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(deleteSaleOrPur.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(deleteSaleOrPur.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(deleteSaleOrPur.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default deleteSaleOrPurSlice.reducer