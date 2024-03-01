import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../../config/config";
import { ShowToast } from '../../../component/utils/ShowToast'

export const payPurchaseCredit = createAsyncThunk(
    "credit/payPurchaseCredit",
    async (payData)=>{
        try{
            const response = await Axios.post(
                `${BASE_URL}/purchases/pay-credit`,
                payData,
                {
                  headers: HEADERS()
                }
              );
            const data = response.data
            ShowToast('success','အကြွေးဆပ်ခြင်းအောင်မြင်ပါသည်')
            return data
        }catch(error){
            if(error.response.status === 401){
                ShowToast('error','ကျေးဇူးပြု၍လော့အင်ပြန်ဝင်ပါ')
                localStorage.removeItem('recycleAppAuth')
            }else if(error.response.status === 422){
                ShowToast('error','လက်ကျန်ငွေမလုံလောက်ပါ')
            }else{
                ShowToast('error','မှားယွင်းနေပါသည်')
            }
            throw new Error(error)
        }
    }
)


const payPurchaseCreditSlice = createSlice({
    name: 'payPurchaseCredit',
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(payPurchaseCredit.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(payPurchaseCredit.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(payPurchaseCredit.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default payPurchaseCreditSlice.reducer