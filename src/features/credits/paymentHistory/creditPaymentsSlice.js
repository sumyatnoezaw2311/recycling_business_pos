import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../../config/config";
import { ShowToast } from "../../../component/utils/ShowToast";


export const fetchCreditPayments = createAsyncThunk(
    'credit/creditPayments',
    async(purchaseId)=>{
        try{
            const response = await Axios.get(`${BASE_URL}/purchases/credit-histories/${purchaseId}`,
                {
                    headers: HEADERS()
                }
            )
            return response.data
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

const creditPaymentsSlice = createSlice({
    name: "creditPayments",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchCreditPayments.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchCreditPayments.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchCreditPayments.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default creditPaymentsSlice.reducer