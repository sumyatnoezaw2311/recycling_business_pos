import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../../config/config";
import { ShowToast } from '../../../component/utils/ShowToast'

export const paySaleDebt = createAsyncThunk(
    "credit/paySaleDebt",
    async (payData)=>{
        try{
            const response = await Axios.post(
                `${BASE_URL}/sales/pay-debt`,
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
            }else{
                ShowToast('error','မှားယွင်းနေပါသည်')
            }
            throw new Error(error)
        }
    }
)


const paySaleDebtSlice = createSlice({
    name: 'paySaleDebt',
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(paySaleDebt.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(paySaleDebt.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(paySaleDebt.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default paySaleDebtSlice.reducer